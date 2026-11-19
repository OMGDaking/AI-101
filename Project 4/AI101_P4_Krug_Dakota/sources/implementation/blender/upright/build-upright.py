"""Build Keyline's abandoned music room and score-synced upright intro."""
import bpy, sys, math, random, wave
from array import array
from pathlib import Path
from mathutils import Vector
P=Path(__file__).resolve().parent
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
out=Path(args[0]).resolve() if args else P
samples=Path(args[1]).resolve() if len(args)>1 else P.parent.parent/'work/keyline/dist/piano'
out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
s=bpy.context.scene
rng=random.Random(34)
pi=math.pi

def material(name,c,rough=.55,grain=0,wood=False,metal=0):
    m=bpy.data.materials.new(name);m.diffuse_color=(*c,1);m.use_nodes=True
    n=m.node_tree.nodes;l=m.node_tree.links
    b=n.get('Principled BSDF');b.inputs['Base Color'].default_value=(*c,1)
    b.inputs['Roughness'].default_value=rough;b.inputs['Metallic'].default_value=metal
    if grain:
        tex=n.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=6 if wood else 11;tex.inputs['Detail'].default_value=4
        coords=n.new('ShaderNodeTexCoord');vec=n.new('ShaderNodeVectorMath');vec.operation='MULTIPLY'
        vec.inputs[1].default_value=(1.0,16,22) if wood else (2,2,2)
        l.new(coords.outputs['Object'],vec.inputs[0]);l.new(vec.outputs[0],tex.inputs['Vector'])
        ramp=n.new('ShaderNodeValToRGB')
        ramp.color_ramp.elements[0].position=.18;ramp.color_ramp.elements[0].color=tuple(x*(1-grain) for x in c)+(1,)
        ramp.color_ramp.elements[1].position=.83;ramp.color_ramp.elements[1].color=tuple(x*(1+grain) for x in c)+(1,)
        l.new(tex.outputs['Fac'],ramp.inputs[0]);l.new(ramp.outputs[0],b.inputs['Base Color'])
        bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=grain*.48;bump.inputs['Distance'].default_value=.021
        l.new(tex.outputs['Fac'],bump.inputs['Height']);l.new(bump.outputs[0],b.inputs['Normal'])
    return m

walnut=material('Scratched walnut',(.117,.047,.021),.39,.56,True)
edge=material('Dark walnut moldings',(.057,.025,.014),.38,.39,True)
brass=material('Old brass',(.39,.23,.093),.32,.26,False,.67)
ivory=material('Aged ivory',(.84,.725,.54),.39,.12)
ebony=material('Ebony',(.028,.022,.018),.31,.1)
felt=material('Oxblood felt',(.25,.032,.029),.9,.2)
plaster=[material('Aged plaster %s'%i,(.21+i*.017,.235+i*.017,.213+i*.014),.93,.38) for i in range(4)]
wall=plaster[1]
dark=material('Cracks and gaps',(.038,.035,.026),.92)
floor=[material('Floorboard %s'%i,(.111+i*.014,.075+i*.009,.05+i*.007),.68,.32,True) for i in range(5)]
iron=material('Blued steel',(.16,.17,.18),.3,.23,False,.62)
red=material('Burgundy lacquer',(.35,.035,.044),.32)
green=material('Green lacquer',(.039,.18,.125),.38)
gold=material('Ochre pencil',(.63,.31,.047),.48)
paper=material('Cream manuscript',(.63,.51,.34),.88,.2)

def finish(o,name,m,bevel=0):
    o.name=name;o.data.materials.append(m)
    if bevel:
        b=o.modifiers.new('Soft worn edges','BEVEL');b.width=bevel;b.segments=3
        o.data.use_auto_smooth=True;o.modifiers.new('Face normals','WEIGHTED_NORMAL')
    return o

def cube(name,loc,dim,m,bevel=.012,parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc)
    o=bpy.context.object;o.dimensions=dim;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    if parent:o.parent=parent
    return finish(o,name,m,bevel)

def cyl(name,loc,r,d,m,parent=None,n=20):
    bpy.ops.mesh.primitive_cylinder_add(vertices=n,radius=r,depth=d,location=loc,rotation=(0,pi/2,0))
    o=bpy.context.object
    if parent:o.parent=parent
    return finish(o,name,m,.003)

def line(name,pts,rad,m):
    c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.bevel_depth=rad;c.bevel_resolution=1
    sp=c.splines.new('POLY');sp.points.add(len(pts)-1)
    for p,co in zip(sp.points,pts):p.co=(*co,1)
    o=bpy.data.objects.new(name,c);s.collection.objects.link(o);c.materials.append(m)
    return o

# Three visible walls, exposed masonry in a shallow plaster gap, and a timber sash.
cube('Back plaster', (.53,1.6,2.5),(9,.18,5),wall)
cube('Left wall',(-3.9,-1,2.5),(.19,5.2,5),plaster[0])
cube('Back skirting',(0,1.48,.16),(8,.10,.31),edge,.02)
cube('Skirting lip',(0,1.406,.31),(8,.055,.06),walnut)
for i in range(24):
    y=-4+i*.236
    split=-3+(i*1.23)%5.9
    for lo,hi in [(-8,split),(split+.018,8)]:
        cube('Old tongue-and-groove floorboard',((lo+hi)/2,y,-.039),(hi-lo,.227,.078),rng.choice(floor),.009)
for i in range(6):
    x=1.75+rng.uniform(-.38,.42);z=.67+i*.122
    for j in range(2+(i%2)):
        o=cube('Exposed brick',(x+j*.235,1.492,z),(.22,.019,.108),plaster[rng.randrange(4)],.012)
for root,delta in [((2.69,1.503,3.15),1),((-.61,1.503,3.81),-1),((3.01,1.503,1.36),-1)]:
    x,y,z=root
    pts=[(x,y,z)]
    for i in range(7):
        x+=rng.uniform(-.05,.045)+delta*.029;z-=rng.uniform(.07,.20);pts.append((x,y,z))
    line('Crack in old plaster',pts,.006,dark)
wx=-2.4
cube('Window recess',(wx,1.481,2.92),(1.55,.07,2.24),edge)
glass=material('Dusty window',(.42,.51,.49),.55)
gb=glass.node_tree.nodes.get('Principled BSDF');gb.inputs['Emission'].default_value=(.48,.65,.66,1);gb.inputs['Emission Strength'].default_value=.62
cube('Window panes',(wx,1.43,2.92),(1.39,.035,2.02),glass)
for x in (wx-.73,wx,wx+.73): cube('Sash mullion',(x,1.39,2.92),(.065,.13,2.15),walnut)
for z in (1.89,2.58,3.26,3.95):cube('Sash rail',(wx,1.388,z),(1.52,.15,.061),walnut)
cube('Deep window sill',(wx,1.31,1.866),(1.78,.34,.10),edge,.019)
for i in range(13):
    x=wx+rng.uniform(-.64,.63);z=rng.uniform(1.96,3.87)
    line('Rain mark',[(x,1.407,z),(x+.004,1.407,z-.09)],.0023,wall)
# A small shelf and books in the room, kept off the piano silhouette.
cube('Workshop shelf',(2.89,1.25,1.27),(1.18,.48,.082),walnut)
for x in (2.47,3.30):cube('Shelf bracket',(x,1.37,1.10),(.058,.18,.32),edge)
for i in range(6):
    cube('Old book',(2.49+i*.13,1.26,1.46),(.11,.27,.30+rng.uniform(-.04,.05)),[felt,green,edge,paper][i%4])
for i in range(3):
    o=cube('Loose manuscript', (3.33,1.25,1.336+i*.015),(.32,.34,.012),paper,.004);o.rotation_euler.z=.11*i
# Upright case: upper soundboard panel, exposed keyboard and a pedal rail.
px=.28
cube('Upright cabinet',(px,.67,1.29),(2.63,.58,2.26),walnut,.047)
cube('Crowned top',(px,.60,2.43),(2.82,.77,.11),walnut,.031)
cube('Lid molding',(px,.202,2.38),(2.79,.065,.061),edge)
cube('Raised soundboard panel',(px,.346,1.945),(2.37,.10,.70),edge,.026)
cube('Soundboard inset',(px,.282,1.945),(2.18,.048,.53),walnut,.023)
plate=cube('Tarnished maker plate',(px,.25,1.972),(.29,.022,.073),brass,.01)
font=bpy.data.curves.new('Maker engraving','FONT');font.body='KEYLINE';font.align_x='CENTER';font.size=.048;font.extrude=.0006
o=bpy.data.objects.new('Maker engraving',font);s.collection.objects.link(o)
o.location=(px,.237,1.959);o.rotation_euler=(pi/2,0,0);font.materials.append(edge)
for x in (px-.88,px+.88):
    cube('Raised panel stile',(x,.25,1.95),(.047,.032,.48),edge,.009)
cube('Fallboard above keys',(px,.231,1.53),(2.47,.22,.20),walnut,.021)
cube('Felt strip',(px,.078,1.411),(2.39,.023,.025),felt,.006)
cube('Keyboard bed',(px,-.045,1.303),(2.71,.65,.134),edge,.026)
cube('Keyboard apron',(px,-.37,1.26),(2.61,.074,.11),walnut,.014)
for x in (px-1.289,px+1.289):
    cube('Keyboard cheek',(x,-.057,1.397),(.142,.63,.12),walnut,.018)
    cube('Front piano leg',(x,-.085,.68),(.149,.16,1.14),edge,.034)
    cube('Foot',(x,-.076,.105),(.29,.47,.18),walnut,.027)
cube('Lower access panel',(px,.326,.69),(2.28,.10,.78),edge,.028)
cube('Lower panel inset',(px,.255,.69),(2.11,.051,.62),walnut,.019)
for i in range(3):
    o=cube('Brass pedal',(px+.13*(i-1),.102,.145),(.081,.36,.049),brass,.02);o.rotation_euler.x=.13

keyobj={}
white=[n for n in range(35,82) if n%12 in (0,2,4,5,7,9,11)]
for i,note in enumerate(white):
    x=px+(i-(len(white)-1)/2)*.091
    keyobj[note]=cube('Ivory MIDI %s'%note,(x,-.143,1.389),(.087,.446,.049),ivory,.007)
    if (note+1)%12 not in (0,2,4,5,7,9,11) and i<len(white)-1:
        keyobj[note+1]=cube('Ebony MIDI %s'%(note+1),(x+.046,-.059,1.423),(.054,.269,.058),ebony,.006)

# Times come from the highlighted notes in the supplied chord video.
# Keep the performance spacing and start the first hit at 0.95 seconds.
chords = [
    (2.28, [(42,0),(54,0),(58,0),(61,0),(65,0)]),
    (3.12, [(44,0),(56,0),(60,0),(63,0)]),
    (4.04, [(46,.04),(53,.12),(56,.04),(58,.04),(61,0)]),
    (4.92, [(41,0),(51,0),(53,.04),(56,.04),(60,0)]),
    (5.80, [(39,0),(49,0),(54,0),(58,0)]),
    (6.72, [(44,0),(51,0),(54,.04),(57,0),(60,0)]),
    (7.60, [(37,0),(53,0),(56,0),(61,0)]),
    (8.52, [(43,0),(53,0),(57,0),(59,0),(63,0)]),
]
fps = 20
frame_count = 161

def cue(time):
    return 1+round((time-2.28+.95)*fps)

events = []
impacts = []
for time, notes in chords:
    for i, (note, delay) in enumerate(notes):
        frame = cue(time+delay)
        events.append((frame,note,.43 if i==0 else .32+.035*i))
        key = keyobj[note]
        rest = 1.389 if note in white else 1.423
        for tick, depth in [(frame-2,0),(frame,.028),(frame+7,.023),(frame+12,0)]:
            key.location.z = rest-depth
            key.keyframe_insert('location',index=2,frame=tick)
        key.location.z = rest

def pose(obj, frame, position, rotation):
    obj.location = position
    obj.rotation_euler = rotation
    obj.keyframe_insert('location',frame=frame)
    obj.keyframe_insert('rotation_euler',frame=frame)

def root(name):
    obj = bpy.data.objects.new(name,None)
    s.collection.objects.link(obj)
    return obj

def broken_half(name, length, side, y, z, x):
    # A jagged inner edge reveals the split when the halves peel apart.
    boundary = [(-.085,-.29),(.05,-.20),(-.06,-.10),(.11,.02),
                (-.04,.17),(.035,.30)]
    outline = [(side*length,-.29),(side*length,.30)] + list(reversed(boundary))
    count = len(outline)
    verts = [(u,v,w) for w in (-.047,.047) for u,v in outline]
    faces = [tuple(reversed(range(count))),tuple(range(count,2*count))]
    faces += [(i,(i+1)%count,(i+1)%count+count,i+count) for i in range(count)]
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts,[],faces)
    mesh.update()
    obj = bpy.data.objects.new(name,mesh)
    s.collection.objects.link(obj)
    finish(obj,name,walnut,.011)
    obj.data.materials.append(paper)
    for p in obj.data.polygons:
        if p.index>=4 and p.index<len(faces)-1:
            p.material_index=1
    obj.location=(x,y,z)
    return obj

def shelf(label, z, center, hit, floor_y):
    y = 1.12
    for dx in (-.72,.72):
        cube(label+' loose bracket',(center+dx,1.44,z-.15),(.068,.14,.24),iron)
        cyl(label+' exposed screw',(center+dx,1.356,z-.12),.023,.027,brass).rotation_euler.z=pi/2
    for side in (-1,1):
        board=broken_half(label+' broken half',1.15,side,y,z,center)
        start=(center,y,z)
        pose(board,1,start,(.02,0,.02))
        pose(board,max(2,hit-13),start,(.02,0,.02))
        pose(board,hit-6,(center,y-.035,z-.03),(.08,side*.07,.02))
        pose(board,hit-2,(center,y-.06,z-.05),(.21,side*.12,.02))
        pose(board,hit,(center+side*.13,y-.13,z-.08),(.43,side*.18,side*.12))
        # Each half drops past an end of the case and rests on the floor.
        pose(board,hit+9,(center+side*1.47,.65,z-.53),(.76,side*.32,side*.36))
        pose(board,hit+22,(center+side*1.74,floor_y+.18,.25),(1.15,side*.15,side*.59))
        pose(board,hit+27,(center+side*1.79,floor_y+.06,.32),(.74,side*.10,side*.66))
        pose(board,hit+35,(center+side*1.83,floor_y,.06),(0,0,side*.69))
    impacts.extend([(hit-6,300,.025),(hit,2500,.082),(hit+22,1200,.065)])

shelf('Top shelf',4.18,.18,cue(2.28),-1.17)
shelf('Middle shelf',3.56,.29,cue(4.04),-.25)
shelf('Bottom shelf',2.94,.12,cue(7.60),.72)

blue=material('Blue enamel',(.032,.15,.32),.32)
mint=material('Jade rubber',(.034,.38,.22),.38)
amber=material('Orange rubber',(.68,.16,.034),.46)
pink=material('Raspberry rubber',(.53,.053,.19),.34)

def make_ball(name,radius,shell):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,radius=radius)
    ball=finish(bpy.context.object,name,shell)
    ball.data.materials.append(ivory)
    for face in ball.data.polygons:
        face.use_smooth=True
        if abs(face.center.z)<radius*.24:
            face.material_index=1
    return ball

def make_stick(name,color,is_pen):
    prop=root(name)
    if is_pen:
        cyl('Barrel',(0,0,0),.024,.26,color,prop)
        cyl('Pen cap',(-.117,0,0),.028,.085,color,prop)
        cyl('Cap ring',(-.08,0,0),.029,.018,brass,prop)
    else:
        cyl('Painted wood',(0,0,0),.021,.30,color,prop,n=6)
        cyl('Ferrule',(-.151,0,0),.021,.027,brass,prop)
        cyl('Eraser',(-.175,0,0),.021,.021,pink,prop)
        cyl('Graphite',(.153,0,0),.008,.024,ebony,prop)
    return prop

def tumble(obj,start,release,hits,radius,bounce):
    first=cue(hits[0][0])
    x,y,z=start
    first_x=keyobj[hits[0][1]].location.x
    pose(obj,1,start,(0,0,.12))
    pose(obj,max(2,release-4),start,(0,0,.12))
    pose(obj,release,(x,y-.18,z-.028),(1.1,.05,.16))
    if y>.8:
        pose(obj,release+5,((x+first_x)/2,.25,z-.12),(2.05,.12,.2))
        pose(obj,first-6,((x+first_x)/2,-.28,2.47),(2.9,.19,.29))
    else:
        pose(obj,first-6,((x+first_x)/2,-.23,2.12),(2.55,.14,.26))
    for i,(time,note) in enumerate(hits):
        frame=cue(time)
        key=keyobj[note]
        x=key.location.x
        z=(1.414 if note in white else 1.452)-.028+radius
        y=-.272 if note in white else -.155
        spin=3.8+i*2
        pose(obj,frame,(x,y,z),(spin,.025,.23))
        impacts.append((frame,280 if bounce else 430,.017))
        if i+1<len(hits):
            following_time,following_note=hits[i+1]
            other=keyobj[following_note].location.x
            next_y=-.272 if following_note in white else -.155
            midpoint=(frame+cue(following_time))/2
            if y!=next_y:
                pose(obj,midpoint-2,(x,-.27,z+bounce*.65),(spin+.7,.045,.29))
            pose(obj,midpoint,((x+other)/2,min(y,next_y),z+bounce),(spin+1,.06,.36))
    pose(obj,frame+5,(x+.06,-.49,1.50+bounce*.45),(spin+.8,.14,.32))
    pose(obj,frame+15,(x+.16,-.76,radius),(spin+2.3,0,.48))
    pose(obj,frame+19,(x+.20,-.87,radius+(.15 if bounce else .06)),(spin+3.5,.08,.6))
    pose(obj,frame+26,(x+.28,-1.02,radius),(spin+4.6,0,.67))
    impacts.append((frame+15,420,.023))

tumble(make_stick('Yellow pencil',gold,False),(-.69,1.02,4.25),cue(2.28),
       [(3.12,44)],.021,0)
tumble(make_stick('Red pencil',red,False),(-.22,1.13,4.25),cue(2.28)+2,
       [(3.12,60)],.021,0)
tumble(make_ball('Orange rubber ball',.094,amber),(.58,1.13,4.32),cue(2.28)+2,
       [(3.12,63),(4.04,61),(4.92,60)],.094,.34)
tumble(make_stick('Green fountain pen',green,True),(-.43,1.02,3.64),cue(4.04),
       [(4.92,51)],.028,0)
tumble(make_ball('Jade bouncy ball',.059,mint),(.32,1.19,3.67),cue(4.04)+1,
       [(4.92,56),(5.80,54),(6.72,57)],.059,.34)
tumble(make_stick('Blue ballpoint pen',blue,True),(.78,1.09,3.64),cue(4.04)+2,
       [(5.80,58)],.028,0)
tumble(make_ball('Pink bouncy ball',.055,pink),(.57,1.10,3.045),cue(7.60),
       [(8.52,63)],.055,.30)
driver=root('Piano tuning screwdriver')
cyl('Bakelite handle',(-.10,0,0),.044,.17,red,driver)
cyl('Steel shaft',(.08,0,0),.014,.23,iron,driver)
tumble(driver,(-.39,1.13,3.031),cue(7.60)+1,[(8.52,53)],.044,0)
# Two items on the piano lid join the opening chord as the top shelf snaps.
tumble(make_stick('Ivory pencil',ivory,False),(-.8,.36,2.507),2,[(2.28,42)],.021,0)
tumble(make_ball('Blue bouncy ball',.062,blue),(.51,.40,2.547),2,
       [(2.28,65)],.062,.25)

s.render.fps=fps;s.frame_start=1;s.frame_end=frame_count
rate=22050;length=rate*frame_count//fps
pcm=[0.]*length
for f,n,a in events:
    file=min(samples.glob('*.wav'),key=lambda p:abs(int(p.stem)-n))
    with wave.open(str(file)) as w:
        assert (w.getframerate(),w.getnchannels(),w.getsampwidth())==(rate,1,2)
        data=array('h',w.readframes(w.getnframes()))
    ratio=2**((n-int(file.stem))/12);start=(f-1)*rate//fps
    for i in range(length-start):
        j=int(i*ratio)
        if j>=len(data):break
        pcm[start+i]+=a*data[j]*math.exp(-i/(rate*.64))*min(1.,(length-start-i)/(rate*.32))
for f,a,decay in impacts:
    start=(f-1)*rate//fps
    for i in range(min(length-start,int(rate*.13))):
        t=i/rate
        pcm[start+i]+=a*(.6*rng.uniform(-1,1)+.4*math.sin(2*pi*175*t))*math.exp(-t/decay)
score=out/'upright-score.wav'
with wave.open(str(score),'wb') as w:
    w.setparams((1,2,rate,0,'NONE','not compressed'));w.writeframes(array('h',[round(max(-32767,min(32767,x))) for x in pcm]).tobytes())

def aim(o,p):o.rotation_euler=(Vector(p)-o.location).to_track_quat('-Z','Y').to_euler()
def light(name,at,target,power,size,color):
    d=bpy.data.lights.new(name,'AREA');d.energy=power;d.size=size;d.color=color
    o=bpy.data.objects.new(name,d);s.collection.objects.link(o);o.location=at;aim(o,target)
light('Cool window spill',(-2.52,.55,3.60),(.1,-.3,1.06),490,2.5,(.70,.84,1))
light('Warm daylight bounce',(1.8,-2.5,4.6),(.2,.2,1.39),305,3.4,(1,.76,.53))
light('Soft room fill',(-1.6,-3,2.65),(.25,.4,1.6),115,3,(1,.87,.69))
s.world=bpy.data.worlds.new('Late afternoon');s.world.use_nodes=True
s.world.node_tree.nodes['Background'].inputs[0].default_value=(.13,.15,.19,1)
s.world.node_tree.nodes['Background'].inputs[1].default_value=.29
cam=bpy.data.objects.new('Slow camera drift',bpy.data.cameras.new('Cinema lens'));s.collection.objects.link(cam);s.camera=cam;cam.data.lens=35
for f,at,target in [(1,(3.0,-7.90,4.02),(.06,.62,2.18)),(frame_count,(2.48,-7.46,3.59),(.10,.54,2.05))]:
    cam.location=at;aim(cam,target)
    cam.keyframe_insert('location',frame=f);cam.keyframe_insert('rotation_euler',frame=f)
s.view_settings.view_transform='Filmic';s.view_settings.look='Medium High Contrast';s.view_settings.exposure=.32
s.render.engine='CYCLES';s.cycles.samples=5;s.cycles.adaptive_min_samples=4;s.cycles.adaptive_threshold=.18
s.cycles.max_bounces=4;s.cycles.diffuse_bounces=2;s.cycles.use_denoising=True
s.render.use_persistent_data=True;s.render.resolution_x=1280;s.render.resolution_y=720;s.render.resolution_percentage=100
s.frame_set(1);s.render.image_settings.file_format='PNG';s.render.filepath=str(out/'upright-poster.png')
bpy.ops.render.render(write_still=True)
s.render.image_settings.file_format='FFMPEG';s.render.ffmpeg.format='MPEG4';s.render.ffmpeg.codec='H264'
s.render.ffmpeg.constant_rate_factor='HIGH';s.render.ffmpeg.audio_codec='AAC';s.render.ffmpeg.audio_bitrate=160
strip=s.sequence_editor_create().sequences.new_sound('Tool impacts and piano signature',str(score),1,1);strip.sound.pack()
s.render.filepath='//keyline-upright-shelves.mp4'
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(out/'keyline-upright.blend'),compress=True)
if 'render' in args[2:]:
    bpy.ops.render.render(animation=True)
