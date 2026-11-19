import {
  AmbientLight, DirectionalLight, Float32BufferAttribute, TextureLoader, OrthographicCamera, Quaternion, Scene,
  Vector3, WebGLRenderer, SRGBColorSpace
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

const digits = ['thumb', 'index', 'middle', 'ring', 'little'];
const strikes = [9, 89, 101, 113, 125];
const tipLengths = [.954, .391, .450, .415, .363];
const views = new WeakMap();
const assets = new Map();
const textures = new Map();
const textureLoader = new TextureLoader();

function createView(container, asset) {
  const scene = new Scene();
  const camera = new OrthographicCamera(-2.5, 2.5, 2.9, -2.9, .1, 30);
  camera.position.set(0, 10, .32);
  camera.up.set(0, 0, -1);
  camera.lookAt(0, 0, .32);
  camera.updateMatrixWorld();
  scene.add(new AmbientLight(0xffe4d4, 1.65));
  const light = new DirectionalLight(0xffe5ce, 2.6);
  light.position.set(-3, 6, -4);
  scene.add(light);
  const fill = new DirectionalLight(0xb0c1ff, .75);
  fill.position.set(3, 3, 4);
  scene.add(fill);

  const hand = clone(asset.scene);
  const left = container.id === 'movingLeftHand';
  scene.add(hand);
  const gloveMeshes = [];
  hand.traverse(mesh => {
    if (!mesh.isSkinnedMesh) return;
    const original = mesh.material;
    const material = original.clone();
    const nail = mesh.name.includes('nail');
    if (!nail) {
      mesh.geometry = mesh.geometry.clone();
      const position = mesh.geometry.getAttribute('position');
      const uv = [];
      for (let i = 0; i < position.count; i++) {
        uv.push(((left ? -1 : 1) * position.getX(i) + 2.7) / 5.4,
          (-position.getZ(i) + 3.3) / 6.3);
      }
      mesh.geometry.setAttribute('uv', new Float32BufferAttribute(uv, 2));
    }
    gloveMeshes.push({ mesh, material, original, nail });
  });
  const tracks = asset.animations[0].tracks;
  const fingers = digits.map((digit, i) => {
    const root = hand.getObjectByName(digit + '01');
    const tip = hand.getObjectByName(digit + (i === 0 ? '02' : '03'));
    const chain = left && i !== 0 ? [root, hand.getObjectByName(digit + '02'), tip] : [root, tip];
    const joints = chain.map(bone => {
      const track = tracks.find(entry => entry.name === bone.name + '.quaternion');
      const values = track.createInterpolant().evaluate((strikes[i] - 1) / 24);
      return { bone, rest: bone.quaternion.clone(), press: new Quaternion().fromArray(values) };
    });
    return { root, tip, joints, origin: root.position.clone(), parentRotation: root.parent.getWorldQuaternion(new Quaternion()).invert() };
  });

  const renderer = new WebGLRenderer({ alpha: true, antialias: true });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.className = 'rigged-hand';
  canvas.setAttribute('aria-hidden', 'true');
  container.prepend(canvas);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    container.classList.remove('has-rig');
    views.set(container, { failed: true });
  });
  return { scene, camera, fingers, renderer, left, gloveMeshes, width: 0, height: 0 };
}

function dressHand(container, view) {
  const id = container.dataset.skin || 'classic';
  const hue = typeof gloveHue === 'function' ? gloveHue(id) : 0;
  const token = id + ':' + hue;
  if (view.skin === token) return;
  view.skin = token;
  const canvas = view.renderer.domElement;
  canvas.style.filter = hue ? `hue-rotate(${hue}deg)` : '';
  if (id !== 'classic' && !textures.has(id)) {
    const texture = textureLoader.load(new URL('../gloves/' + id + '-fabric.png', import.meta.url).href,
      () => { if (typeof render === 'function') render(); });
    texture.colorSpace = SRGBColorSpace;
    textures.set(id, texture);
  }
  for (const {mesh, material, original, nail} of view.gloveMeshes) {
    mesh.visible = !nail || id === 'classic';
    mesh.material = id === 'classic' ? original : material;
    if (id !== 'classic' && !nail) {
      material.color.set(0xffffff);
      material.map = textures.get(id);
      material.roughness = id === 'spotlight' ? .36 : .72;
      material.metalness = id === 'spotlight' ? .6 : 0;
      material.needsUpdate = true;
    }
  }
}

function paint(container, view, pose) {
  view.pose = pose;
  const { scene, camera, fingers, renderer, left } = view;
  const width = container.clientWidth, height = container.clientHeight;
  if (!width || !height) return;
  if (view.width !== width || view.height !== height) {
    renderer.setSize(width, height, false);
    view.width = width;
    view.height = height;
  }

  dressHand(container, view);
  const svg = container.querySelector('svg');
  for (const [i, finger] of fingers.entries()) {
    const target = pose.targets[i];
    const pressure = Math.min(1, Math.abs(target.y) / (target.y < 0 ? 18 : 17));
    for (const joint of finger.joints) joint.bone.quaternion.slerpQuaternions(joint.rest, joint.press, pressure);
    // The original keyboard planner supplies contact coordinates in a 220-unit span.
    const desiredX = (target.x + [39, 79, 117, 154, 187][i]) / 44 - 2.5;
    const reach = new Vector3(0, 0, target.y < 0 ? -.5 * pressure : 0);
    finger.root.position.copy(finger.origin).add(reach.applyQuaternion(finger.parentRotation));
    const point = new Vector3(0, tipLengths[i], 0);
    finger.tip.localToWorld(point.set(0, tipLengths[i], 0));
    const offset = desiredX - (left ? -point.x : point.x);
    // Keep the left knuckles close to their anchors during wide reaches.
    const delta = left ? Math.max(-.32, Math.min(.32, offset)) : offset;
    finger.root.position.add(new Vector3(left ? -delta : delta, 0, 0).applyQuaternion(finger.parentRotation));
    finger.tip.localToWorld(point.set(0, tipLengths[i], 0));
    point.project(camera);
    const x = (left ? 1 - point.x : 1 + point.x) * 110;
    const y = (1 - point.y) * 105;
    const marker = svg.querySelector(`.finger-detail[data-digit="${i}"]`);
    marker.setAttribute('transform', `translate(${x - [39, 79, 117, 154, 187][i]} ${y - [117, 66, 44, 62, 89][i]})`);
  }
  renderer.render(scene, camera);
  container.classList.add('has-rig');
}

window.paintRiggedHand = (container, pose) => {
  let view = views.get(container);
  if (!view) {
    view = { loading: true, pose };
    views.set(container, view);
    const side = container.id === 'movingLeftHand' ? 'left' : 'right';
    if (!assets.has(side)) {
      const url = new URL('../models/keyline-' + side + '-hand.glb?v=rig-2', import.meta.url);
      assets.set(side, new GLTFLoader().loadAsync(url.href));
    }
    assets.get(side).then(asset => {
      const ready = createView(container, asset);
      views.set(container, ready);
      paint(container, ready, view.pose);
      new ResizeObserver(() => {
        if (views.get(container) === ready) {
          paint(container, ready, ready.pose);
        }
      }).observe(container);
    }).catch(error => {
      console.warn('3D hand unavailable:', error.message);
      container.classList.remove('has-rig');
      views.set(container, { failed: true });
    });
    return;
  }
  if (view.loading) view.pose = pose;
  else if (!view.failed) paint(container, view, pose);
};

if (typeof render === "function") render();
