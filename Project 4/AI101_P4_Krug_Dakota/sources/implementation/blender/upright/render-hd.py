"""Render landscape and portrait cuts of the Keyline shelf intro from the source blend."""
import bpy
import sys
from pathlib import Path
from mathutils import Vector

output, orientation, *options = sys.argv[sys.argv.index("--") + 1:]
output = Path(output).resolve()
output.mkdir(parents=True, exist_ok=True)
scene = bpy.context.scene
portrait = orientation == "portrait"
if orientation not in {"portrait", "landscape"}:
    raise ValueError("Choose portrait or landscape.")

# Keep the chord and prop timing while sampling the original motion at 30 fps.
old_fps = scene.render.fps
new_fps = 30
ratio = new_fps / old_fps
scene.frame_end = round((scene.frame_end - scene.frame_start + 1) * ratio)
for action in bpy.data.actions:
    for curve in action.fcurves:
        for key in curve.keyframe_points:
            key.co.x = 1 + (key.co.x - 1) * ratio
            key.handle_left.x = 1 + (key.handle_left.x - 1) * ratio
            key.handle_right.x = 1 + (key.handle_right.x - 1) * ratio
        curve.update()
scene.render.fps = new_fps
scene.render.resolution_x = 1080 if portrait else 1920
scene.render.resolution_y = 1920 if portrait else 1080
scene.render.resolution_percentage = 100
if portrait:
    camera = scene.camera
    camera.animation_data_clear()
    camera.data.lens = 40
    for name in ("Back plaster", "Left wall"):
        wall = bpy.data.objects[name]
        wall.scale.z *= 1.6
        wall.location.z += 1.5
    for frame, location, target in [
        (1, (1.8, -6.90, 3.38), (.12, .58, 2.20)),
        (scene.frame_end, (1.47, -6.48, 3.19), (.12, .56, 2.12)),
    ]:
        camera.location = location
        camera.rotation_euler = (Vector(target) - camera.location).to_track_quat("-Z", "Y").to_euler()
        camera.keyframe_insert("location", frame=frame)
        camera.keyframe_insert("rotation_euler", frame=frame)

if "eevee" in options:
    scene.render.engine = "BLENDER_EEVEE"
    scene.eevee.taa_render_samples = 12
    scene.eevee.use_gtao = True
    scene.eevee.gtao_distance = 1.5
    scene.eevee.gtao_factor = 1.25
    scene.eevee.use_ssr = True
    scene.eevee.shadow_cube_size = '1024'
    scene.eevee.shadow_cascade_size = '1024'
else:
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 7
    scene.cycles.adaptive_min_samples = 4
    scene.cycles.adaptive_threshold = .18
    scene.cycles.use_denoising = True
    scene.render.use_persistent_data = True

scene.frame_set(1)
scene.render.image_settings.file_format = "JPEG"
scene.render.image_settings.quality = 88
scene.render.filepath = str(output / f"intro-{orientation}.jpg")
bpy.ops.render.render(write_still=True)

scene.render.image_settings.file_format = "FFMPEG"
scene.render.ffmpeg.format = "MPEG4"
scene.render.ffmpeg.codec = "H264"
scene.render.ffmpeg.constant_rate_factor = "HIGH"
scene.render.ffmpeg.audio_codec = "AAC"
scene.render.ffmpeg.audio_bitrate = 160
scene.render.filepath = str(output / f"intro-{orientation}.mp4")
if "render" in options:
    bpy.ops.render.render(animation=True)
