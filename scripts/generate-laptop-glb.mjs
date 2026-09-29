import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import fs from "fs";
import path from "path";

// Polyfill FileReader for Node.js
global.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
};

function createLaptopGLB() {
  const root = new THREE.Group();
  root.name = "GloroLaptop";

  // --- PBR Materials ---
  // Space Gray CNC Anodized Aluminum
  const bodyMaterial = new THREE.MeshStandardMaterial({
    name: "Aluminum_Body",
    color: 0xd6dbe4,
    metalness: 0.92,
    roughness: 0.19,
  });

  // Dark Keyboard Recess Metal
  const recessMaterial = new THREE.MeshStandardMaterial({
    name: "Keyboard_Recess",
    color: 0x9fa8b6,
    metalness: 0.85,
    roughness: 0.28,
  });

  // Matte Dark Scissor Keycaps
  const keyMaterial = new THREE.MeshStandardMaterial({
    name: "Keycaps_Matte",
    color: 0x141820,
    metalness: 0.15,
    roughness: 0.58,
  });

  // Frosted Glass Trackpad
  const trackpadMaterial = new THREE.MeshStandardMaterial({
    name: "Trackpad_Glass",
    color: 0xc4cbd5,
    metalness: 0.45,
    roughness: 0.15,
  });

  // Screen Bezel (Matte Obsidian)
  const bezelMaterial = new THREE.MeshStandardMaterial({
    name: "Screen_Bezel",
    color: 0x0a0c10,
    metalness: 0.2,
    roughness: 0.45,
  });

  // Screen Surface (Emissive/Dynamic PBR ready)
  const screenMaterial = new THREE.MeshStandardMaterial({
    name: "Screen_Surface",
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.1,
  });

  // Screen Front Glass Protective Layer
  const screenGlassMaterial = new THREE.MeshStandardMaterial({
    name: "Screen_Glass",
    color: 0xe2e8f0,
    metalness: 0.1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.18,
  });

  // Rubber Feet
  const rubberMaterial = new THREE.MeshStandardMaterial({
    name: "Rubber_Feet",
    color: 0x1e2229,
    metalness: 0.05,
    roughness: 0.85,
  });

  // ==========================================
  // 1. BASE CHASSIS (CNC Unibody)
  // ==========================================
  const baseGroup = new THREE.Group();
  baseGroup.name = "BaseChassis";

  // Main Bottom Unibody Slab: 3.12w x 2.14d x 0.075h
  const baseGeom = new THREE.BoxGeometry(3.12, 0.075, 2.14);
  const baseMesh = new THREE.Mesh(baseGeom, bodyMaterial);
  baseMesh.name = "Chassis_Main";
  baseMesh.position.set(0, 0.0375, 0.52);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  baseGroup.add(baseMesh);

  // Bottom Taper Chamfer (gives that razor-thin modern silhouette)
  const taperGeom = new THREE.BoxGeometry(3.06, 0.02, 2.08);
  const taperMesh = new THREE.Mesh(taperGeom, bodyMaterial);
  taperMesh.position.set(0, 0.005, 0.52);
  baseGroup.add(taperMesh);

  // Front Thumb Scoop
  const scoopGeom = new THREE.BoxGeometry(0.48, 0.025, 0.035);
  const scoopMesh = new THREE.Mesh(scoopGeom, recessMaterial);
  scoopMesh.position.set(0, 0.065, 1.58);
  baseGroup.add(scoopMesh);

  // Keyboard Deck Recess: 2.58w x 1.04d x 0.008 deep
  const recessGeom = new THREE.BoxGeometry(2.58, 0.008, 1.04);
  const recessMesh = new THREE.Mesh(recessGeom, recessMaterial);
  recessMesh.name = "Keyboard_Well";
  recessMesh.position.set(0, 0.075, 0.28);
  baseGroup.add(recessMesh);

  // Keyboard Rows (5 rows of realistic chiclet keycaps)
  const keyGroup = new THREE.Group();
  keyGroup.name = "Keyboard_Deck";

  const rows = 5;
  const cols = 14;
  const kw = 0.152;
  const kd = 0.158;
  const kh = 0.014;
  const gapX = 0.026;
  const gapZ = 0.028;
  const startX = -((cols - 1) * (kw + gapX)) / 2;
  const startZ = 0.28 - ((rows - 1) * (kd + gapZ)) / 2;

  const keyGeom = new THREE.BoxGeometry(kw, kh, kd);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Spacebar row
      if (r === rows - 1 && c >= 4 && c <= 9) {
        if (c === 4) {
          const spaceGeom = new THREE.BoxGeometry(kw * 6 + gapX * 5, kh, kd);
          const spaceMesh = new THREE.Mesh(spaceGeom, keyMaterial);
          spaceMesh.position.set(0, 0.082, startZ + r * (kd + gapZ));
          keyGroup.add(spaceMesh);
        }
        continue;
      }
      const kMesh = new THREE.Mesh(keyGeom, keyMaterial);
      kMesh.position.set(startX + c * (kw + gapX), 0.082, startZ + r * (kd + gapZ));
      keyGroup.add(kMesh);
    }
  }
  baseGroup.add(keyGroup);

  // Precision Glass Trackpad: 1.12w x 0.72d
  const padGeom = new THREE.BoxGeometry(1.12, 0.006, 0.72);
  const padMesh = new THREE.Mesh(padGeom, trackpadMaterial);
  padMesh.name = "Trackpad";
  padMesh.position.set(0, 0.076, 1.12);
  baseGroup.add(padMesh);

  // Dual Speaker Grilles (Flanking the keyboard)
  const spkGeom = new THREE.BoxGeometry(0.12, 0.004, 1.02);
  const spkLeft = new THREE.Mesh(spkGeom, recessMaterial);
  spkLeft.position.set(-1.42, 0.076, 0.28);
  const spkRight = new THREE.Mesh(spkGeom, recessMaterial);
  spkRight.position.set(1.42, 0.076, 0.28);
  baseGroup.add(spkLeft);
  baseGroup.add(spkRight);

  // 4 Rubber Feet
  const footGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.015, 16);
  const feetCoords = [
    [-1.38, -0.005, -0.38],
    [1.38, -0.005, -0.38],
    [-1.38, -0.005, 1.42],
    [1.38, -0.005, 1.42],
  ];
  feetCoords.forEach(([fx, fy, fz], idx) => {
    const foot = new THREE.Mesh(footGeom, rubberMaterial);
    foot.position.set(fx, fy, fz);
    baseGroup.add(foot);
  });

  // Cylindrical Hinge Bar
  const hingeGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.7, 24);
  hingeGeom.rotateZ(Math.PI / 2);
  const hingeMesh = new THREE.Mesh(hingeGeom, bodyMaterial);
  hingeMesh.name = "Hinge_Bar";
  hingeMesh.position.set(0, 0.068, -0.53);
  baseGroup.add(hingeMesh);

  root.add(baseGroup);

  // ==========================================
  // 2. DISPLAY LID ASSEMBLY (Open at 104°)
  // ==========================================
  const lidPivot = new THREE.Group();
  lidPivot.name = "LidPivot";
  lidPivot.position.set(0, 0.068, -0.53);

  // Ergonomic open angle: 104 degrees open for balanced camera perspective
  const openAngleRad = THREE.MathUtils.degToRad(104);
  lidPivot.rotation.x = -openAngleRad;

  // Outer Aluminum Back Lid: 3.12w x 2.08h x 0.044d
  const lidBackGeom = new THREE.BoxGeometry(3.12, 2.08, 0.044);
  const lidBackMesh = new THREE.Mesh(lidBackGeom, bodyMaterial);
  lidBackMesh.name = "Lid_Back";
  lidBackMesh.position.set(0, 1.04, -0.022);
  lidBackMesh.castShadow = true;
  lidPivot.add(lidBackMesh);

  // Subtle Gloro Emblem Plate on Back of Lid
  const logoPlateGeom = new THREE.BoxGeometry(0.24, 0.24, 0.004);
  const logoPlate = new THREE.Mesh(logoPlateGeom, trackpadMaterial);
  logoPlate.position.set(0, 1.04, -0.046);
  lidPivot.add(logoPlate);

  // Inner Obsidian Bezel: 3.08w x 2.04h x 0.008d
  const bezelGeom = new THREE.BoxGeometry(3.08, 2.04, 0.008);
  const bezelMesh = new THREE.Mesh(bezelGeom, bezelMaterial);
  bezelMesh.name = "Screen_Bezel";
  bezelMesh.position.set(0, 1.04, 0.004);
  lidPivot.add(bezelMesh);

  // Centered Webcam Aperture Dot
  const camDotGeom = new THREE.CircleGeometry(0.014, 16);
  const camDot = new THREE.Mesh(camDotGeom, recessMaterial);
  camDot.position.set(0, 1.98, 0.009);
  lidPivot.add(camDot);

  // Active Screen Surface Mesh (Target for ScreenContent texture)
  // Dimensions: 2.92w x 1.84h (16:10 aspect ratio)
  const screenGeom = new THREE.PlaneGeometry(2.92, 1.84);
  const screenMesh = new THREE.Mesh(screenGeom, screenMaterial);
  screenMesh.name = "ScreenSurface";
  screenMesh.position.set(0, 1.02, 0.009);
  lidPivot.add(screenMesh);

  // Front Glass Layer (Adds realistic specular highlights and reflection depth)
  const glassGeom = new THREE.PlaneGeometry(2.94, 1.86);
  const glassMesh = new THREE.Mesh(glassGeom, screenGlassMaterial);
  glassMesh.name = "ScreenGlass";
  glassMesh.position.set(0, 1.02, 0.012);
  lidPivot.add(glassMesh);

  root.add(lidPivot);

  // Center the root origin nicely around the chassis center
  root.position.set(0, -0.2, 0);

  return root;
}

async function exportGLB() {
  const model = createLaptopGLB();
  const exporter = new GLTFExporter();

  const outputPath = path.resolve("public/models/gloro-laptop.glb");

  exporter.parse(
    model,
    (glb) => {
      fs.writeFileSync(outputPath, Buffer.from(glb));
      console.log(`Successfully generated production GLB at: ${outputPath}`);
      console.log(`GLB file size: ${(glb.byteLength / 1024).toFixed(1)} KB`);
    },
    (err) => {
      console.error("GLTF export error:", err);
      process.exit(1);
    },
    { binary: true }
  );
}

exportGLB();
