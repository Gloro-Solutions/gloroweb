import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ScreenContentSystem } from "./ScreenContent";
import { createContactShadow } from "./Lighting";

export interface LaptopInstance {
  group: THREE.Group;
  modelContainer: THREE.Group;
  shadowMesh: THREE.Mesh;
  screenSystem: ScreenContentSystem;
  screenMesh?: THREE.Mesh;
  update: (time: number, variantOrProgress: string | number, subState?: number) => void;
  dispose: () => void;
}

export async function loadLaptopModel(): Promise<LaptopInstance> {
  const modelUrl = "/models/gloro-laptop.glb";
  const screenSystem = new ScreenContentSystem(1440, 900);

  return new Promise<LaptopInstance>((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;
        let screenMesh: THREE.Mesh | undefined;
        let lidPivot: THREE.Object3D | undefined;

        // Traverse hierarchy and upgrade materials for studio presentation
        root.traverse((child) => {
          if (child.name === "LidPivot") {
            lidPivot = child;
          }

          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Target the active screen surface vs glass vs bezel
            if (child.name === "ScreenGlass") {
              // Hide screen glass overlay mesh so the high-resolution CanvasTexture is 100% crisp and readable
              child.visible = false;
            } else if (
              child.name === "ScreenSurface" ||
              (child.name.toLowerCase().includes("screen") && child.name !== "Screen_Bezel")
            ) {
              screenMesh = child;
              // Apply dynamic screen texture
              child.material = new THREE.MeshBasicMaterial({
                map: screenSystem.texture,
              });
            } else if (child.name === "Screen_Bezel") {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x0a0d14,
                metalness: 0.2,
                roughness: 0.8,
              });
            } else if (child.name.toLowerCase().includes("glass")) {
              child.visible = false;
            } else if (
              child.name.includes("Chassis") ||
              child.name.includes("Lid_Back") ||
              child.name.includes("Aluminum") ||
              child.name.includes("Hinge")
            ) {
              // High-end CNC Anodized Space Gray Aluminum
              child.material = new THREE.MeshStandardMaterial({
                color: 0xd8dde6,
                metalness: 0.94,
                roughness: 0.18,
              });
            } else if (child.name.includes("Key")) {
              // Matte Graphite Keyboard Keys
              child.material = new THREE.MeshStandardMaterial({
                color: 0x141820,
                metalness: 0.1,
                roughness: 0.65,
              });
            } else if (child.name.includes("Trackpad")) {
              // Frosted Glass Trackpad
              child.material = new THREE.MeshStandardMaterial({
                color: 0xc4cbd5,
                metalness: 0.4,
                roughness: 0.16,
              });
            }
          }
        });

        // Set laptop lid to open, upright ergonomic angle (~108 degrees) facing camera
        if (lidPivot) {
          (lidPivot as THREE.Object3D).rotation.x = -18 * (Math.PI / 180);
        }

        // Group container
        const group = new THREE.Group();
        group.name = "LaptopWrapper";

        const modelContainer = new THREE.Group();
        modelContainer.name = "LaptopModelContainer";
        modelContainer.add(root);

        // Add soft realistic contact shadow beneath the laptop (stays level horizontally)
        const shadowMesh = createContactShadow();
        shadowMesh.position.set(0, -0.04, 0.15);

        group.add(shadowMesh);
        group.add(modelContainer);

        const update = (time: number, variantOrProgress: string | number, subState = 0) => {
          if (typeof variantOrProgress === "string") {
            screenSystem.renderSection(time, variantOrProgress as any, subState);
          } else {
            screenSystem.render(time, variantOrProgress);
          }
        };

        const dispose = () => {
          screenSystem.dispose();
          root.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry.dispose();
              if (Array.isArray(obj.material)) {
                obj.material.forEach((m) => m.dispose());
              } else {
                obj.material.dispose();
              }
            }
          });
        };

        resolve({
          group,
          modelContainer,
          shadowMesh,
          screenSystem,
          screenMesh,
          update,
          dispose,
        });
      },
      undefined,
      (err) => {
        console.warn("Failed to load /models/gloro-laptop.glb, using fallback", err);
        reject(err);
      }
    );
  });
}
