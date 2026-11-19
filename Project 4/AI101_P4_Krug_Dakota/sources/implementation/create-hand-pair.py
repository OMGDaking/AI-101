"""Build a dedicated left hand and a two-hand practice scene from the Keyline right hand."""
from pathlib import Path
import bpy
from mathutils import Matrix

folder = Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(folder / 'keyline-right-hand.blend'))
bpy.context.preferences.filepaths.save_version = 0
scene = bpy.context.scene
scene.frame_set(1)
right = bpy.data.objects['Right hand rig']
reflection = Matrix.Diagonal((-1, 1, 1, 1))

left = right.copy()
left.data = right.data.copy()
scene.collection.objects.link(left)
left.name = 'Left hand rig'
left.data.name = 'Left piano hand skeleton'
left.animation_data.action = right.animation_data.action.copy()
left.animation_data.action.name = 'Left hand - repeated thumb and five fingers'

bpy.ops.object.select_all(action='DESELECT')
left.select_set(True)
bpy.context.view_layer.objects.active = left
bpy.ops.object.mode_set(mode='EDIT')
for bone in left.data.edit_bones:
    roll_axis = reflection.to_3x3() @ bone.z_axis
    head = reflection @ bone.head
    tail = reflection @ bone.tail
    bone.head, bone.tail = head, tail
    bone.align_roll(roll_axis)
bpy.ops.object.mode_set(mode='OBJECT')

meshes = []
for original in right.children:
    mesh = original.copy()
    mesh.data = original.data.copy()
    scene.collection.objects.link(mesh)
    mesh.name = 'Left ' + original.name.replace('Right ', '')
    mesh.data.transform(reflection)
    mesh.data.flip_normals()
    mesh.parent = left
    for modifier in mesh.modifiers:
        if modifier.type == 'ARMATURE':
            modifier.object = left
    mesh.select_set(True)
    meshes.append(mesh)

# Spread the press through the finger, with the wrist and knuckle anchored.
left_events = [(9,'thumb'),(23,'thumb'),(37,'thumb'),(51,'thumb')]
left_events += [(77+12*i,d) for i,d in enumerate(('thumb','index','middle','ring','little'))]
scene.frame_set(1)
left.animation_data_clear()
for onset, digit in left_events:
    chain = [left.pose.bones[digit+'.01'], left.pose.bones[digit+'.02']]
    if digit != 'thumb':
        chain.append(left.pose.bones[digit+'.03'])
    weights = (1,.65) if len(chain)==2 else (1,.72,.4)
    low, high = 0., .7
    for _ in range(22):
        angle = (low+high)*.5
        for bone, weight in zip(chain,weights):
            bone.rotation_euler.x = -angle*weight
        bpy.context.view_layer.update()
        if chain[-1].tail.z > .092:
            low = angle
        else:
            high = angle
    for frame, pressure in ((onset-3,0),(onset,1),(onset+4,1),(onset+8,0)):
        for bone, weight in zip(chain,weights):
            bone.rotation_euler.x = -angle*weight*pressure
            bone.keyframe_insert('rotation_euler',index=0,frame=frame,group=digit)
    for bone in chain:
        bone.rotation_euler.x = 0
left.animation_data.action.name = 'Left piano hand - coordinated finger curls'
scene.frame_set(1)
bpy.ops.export_scene.gltf(
    filepath=str(folder / 'keyline-left-hand.glb'),
    export_format='GLB', use_selection=True,
)

# Space the hands over separate octaves and add a matching keyboard range.
left.location.x = -7
scene.timeline_markers.clear()
scene.timeline_markers.new('Both thumbs · C4 and G3', frame=1)
scene.timeline_markers.new('Five fingers · both hands', frame=70)

for name in ('A3','B3','C4','D4','E4','F4','G4'):
    original = bpy.data.objects[name]
    key = original.copy()
    scene.collection.objects.link(key)
    key.location.x = original.location.x - 7
    key.animation_data_clear()
    source_x = -7 - key.location.x
    source_name = {2:'G4', 1:'F4', 0:'E4', -1:'D4', -2:'C4'}.get(round(source_x))
    if source_name:
        source = bpy.data.objects[source_name]
        key.animation_data_create().action = source.animation_data.action.copy()
    note = name[0] + str(int(name[1])-1)
    key.name = 'Left keyboard ' + note
    for child in original.children:
        label = child.copy()
        label.data = child.data.copy()
        scene.collection.objects.link(label)
        label.parent = key
        label.data.body = note

# Rebuild the lower octave's accidentals at the correct note boundaries.
for x in (-10.5, -8.5, -7.5, -5.5, -4.5):
    key = bpy.data.objects['A sharp'].copy()
    scene.collection.objects.link(key)
    key.location.x = x
for name in ('Felt strip','Keyboard case'):
    obj = bpy.data.objects[name]
    obj.scale.x *= 16/9.2
    obj.location.x -= 3.5

camera = scene.camera
camera.location.x -= 3.5
from mathutils import Vector
camera.rotation_euler = (Vector((-3.5,1.5,0))-camera.location).to_track_quat('-Z','Y').to_euler()
camera.data.ortho_scale = 19
scene.render.resolution_x = 1400
scene.render.resolution_y = 780
scene.frame_set(101)
bpy.ops.object.select_all(action='DESELECT')
for rig in (left, right):
    rig.select_set(True)
bpy.context.view_layer.objects.active = right
scene.render.filepath = '//keyline-two-hands-preview.png'
bpy.ops.wm.save_as_mainfile(filepath=str(folder / 'keyline-two-hands.blend'))
bpy.ops.render.render(write_still=True)
