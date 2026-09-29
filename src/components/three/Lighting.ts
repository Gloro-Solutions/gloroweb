import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export function setupStudioLighting(scene: THREE.Scene, renderer?: THREE.WebGLRenderer) {
  // 1. Studio Environment Map via PMREMGenerator (Transforms PBR metallic reflections)
  if (renderer) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();
  }

  // 2. Soft Neutral Studio Ambient Base
  const ambientLight = new THREE.AmbientLight(0xf8fafc, 0.85);
  scene.add(ambientLight);

  // 3. Primary Key Light (Soft, high-angle studio softbox)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4.5, 6.0, 4.0);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 1.0;
  keyLight.shadow.camera.far = 16;
  keyLight.shadow.bias = -0.0002;
  keyLight.shadow.normalBias = 0.02;
  scene.add(keyLight);

  // 4. Subtle Fill Light (Neutral cool tone for shadows)
  const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.8);
  fillLight.position.set(-3.5, 3.0, 3.5);
  scene.add(fillLight);

  // 5. Signature Gloro Blue Rim Light (Back-Right grazing edge highlight)
  const rimLight = new THREE.DirectionalLight(0x2563eb, 2.4);
  rimLight.position.set(-4.0, 4.5, -5.0);
  scene.add(rimLight);

  // 6. Secondary Subtle Top Rim (Crisp silhouette separation)
  const topRim = new THREE.DirectionalLight(0x93c5fd, 1.2);
  topRim.position.set(3.0, 5.0, -3.5);
  scene.add(topRim);

  // 7. Ground Bounce Fill
  const bounceLight = new THREE.DirectionalLight(0x94a3b8, 0.35);
  bounceLight.position.set(0, -3.0, 1.0);
  scene.add(bounceLight);

  return { ambientLight, keyLight, fillLight, rimLight, topRim, bounceLight };
}

/**
 * Generates an ultra-soft, realistic contact shadow beneath the laptop
 */
export function createContactShadow(): THREE.Mesh {
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 1024;
  shadowCanvas.height = 1024;
  const ctx = shadowCanvas.getContext("2d")!;

  // Smooth multi-stop radial gradient for soft diffused shadow
  const grad = ctx.createRadialGradient(512, 512, 60, 512, 512, 480);
  grad.addColorStop(0, "rgba(15, 23, 42, 0.38)");
  grad.addColorStop(0.25, "rgba(15, 23, 42, 0.22)");
  grad.addColorStop(0.55, "rgba(15, 23, 42, 0.08)");
  grad.addColorStop(0.85, "rgba(15, 23, 42, 0.02)");
  grad.addColorStop(1, "rgba(15, 23, 42, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  shadowTexture.generateMipmaps = false;
  shadowTexture.minFilter = THREE.LinearFilter;

  const shadowGeom = new THREE.PlaneGeometry(4.8, 3.8);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });

  const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.set(0, -0.01, 0.45);
  shadowMesh.name = "GroundContactShadow";

  return shadowMesh;
}
