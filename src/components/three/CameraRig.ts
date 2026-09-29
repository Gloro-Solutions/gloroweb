import * as THREE from "three";

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export interface LaptopTransform {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
}

export class CameraRig {
  public camera: THREE.PerspectiveCamera;

  // Camera state
  private currentCameraPos = new THREE.Vector3(0, 0.35, 5.0);
  private targetCameraPos = new THREE.Vector3();
  private currentCameraLookAt = new THREE.Vector3(0, 0.0, 0);
  private targetCameraLookAt = new THREE.Vector3();

  // Laptop state
  private currentLaptopPos = new THREE.Vector3(1.20, -0.18, 0);
  private targetLaptopPos = new THREE.Vector3();
  private currentLaptopRot = new THREE.Euler(0.08, -0.28, 0);
  private targetLaptopRot = new THREE.Euler(0.08, -0.28, 0);
  private currentLaptopScale = 0.56;
  private targetLaptopScale = 0.56;

  private isMobile = false;

  constructor(aspect: number) {
    // Studio product lens: 30 deg FOV eliminates wide-angle distortion
    this.camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 50);
    this.camera.position.copy(this.currentCameraPos);
    this.targetCameraPos.copy(this.currentCameraPos);
    this.targetCameraLookAt.copy(this.currentCameraLookAt);
    this.camera.lookAt(this.currentCameraLookAt);
  }

  public resize(aspect: number, isMobile: boolean) {
    this.isMobile = isMobile;
    this.camera.aspect = aspect;
    this.camera.fov = isMobile ? 36 : 30;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Unified spatial choreography driving both camera and laptop:
   * 0.00 - 0.20: HERO (Laptop on Right, Content on Left)
   * 0.20 - 0.38: HERO -> WEB (Laptop moves from Right across to Left)
   * 0.38 - 0.58: WEB (Laptop held on Left, Content on Right)
   * 0.58 - 0.74: WEB -> APPLICATIONS (Laptop moves from Left across to Right)
   * 0.74 - 0.94: APPLICATIONS (Laptop held on Right, Content on Left)
   * 0.94 - 1.00: HANDOFF (Smooth release to downstream sections)
   */
  public update(
    mouse: { x: number; y: number },
    scrollProgress: number,
    reducedMotion: boolean,
    time = 0
  ) {
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Base target variables - Camera stays centered so laptop movement across the screen is full & unobstructed
    let camX = 0.0;
    let camY = 0.35;
    let camZ = 5.0;

    let lookX = 0.0;
    let lookY = 0.0;

    let lapX = 1.20;
    let lapY = -0.18;
    let lapZ = 0.0;
    let lapRotX = 0.08;
    let lapRotY = -0.28;
    let lapScale = 0.56;

    if (this.isMobile) {
      // Mobile: Centered, vertical composition (Text -> Laptop -> Info)
      camZ = 5.8;
      camY = 0.30;
      lookY = -0.10;
      lapX = 0.0;
      lapRotX = 0.08;
      lapRotY = 0.0;
      lapScale = 0.44;

      if (p < 0.20) {
        lapY = -0.28;
      } else if (p < 0.38) {
        const t = smoothstep(0.20, 0.38, p);
        const dip = 0.10 * Math.sin(t * Math.PI);
        lapY = -0.28 - dip;
      } else if (p < 0.58) {
        lapY = -0.28;
      } else if (p < 0.74) {
        const t = smoothstep(0.58, 0.74, p);
        const dip = 0.12 * Math.sin(t * Math.PI);
        camY = 0.30 - 0.08 * Math.sin(t * Math.PI);
        lookY = -0.10 - 0.06 * Math.sin(t * Math.PI);
        lapY = -0.28 - dip;
      } else {
        lapY = -0.28;
      }
    } else {
      // Desktop: Definitive alternating cinematic choreography
      if (p < 0.20) {
        // 1. HERO HOLD (0.00 - 0.20): Laptop on RIGHT (+1.20), text on left
        camX = 0.0;
        camY = 0.35;
        camZ = 5.0;
        lookX = 0.0;
        lookY = 0.0;

        lapX = 1.20;
        lapY = -0.18;
        lapRotX = 0.08;
        lapRotY = -0.28; // angled facing left towards hero headline
        lapScale = 0.56;
      } else if (p < 0.38) {
        // 2. HERO -> WEB TRANSITION (0.20 - 0.38): Laptop glides from RIGHT (+1.20) to LEFT (-1.20)
        const t = smoothstep(0.20, 0.38, p);
        const arcDip = 0.26 * Math.sin(t * Math.PI);
        const camArcDip = 0.10 * Math.sin(t * Math.PI);

        lapX = 1.20 + (-1.20 - 1.20) * t; // +1.20 -> -1.20 (Right to Left)
        lapY = -0.18 - arcDip;
        lapRotX = 0.08 + 0.03 * Math.sin(t * Math.PI);
        lapRotY = -0.28 + (0.28 - (-0.28)) * t; // -0.28 -> +0.28 (angles to face right towards Web text)
        lapScale = 0.56;

        camX = 0.0;
        camY = 0.35 - camArcDip;
        camZ = 5.0;
        lookX = 0.0;
        lookY = 0.0;
      } else if (p < 0.58) {
        // 3. SECTION 01 // WEB EXPERIENCES HOLD (0.38 - 0.58): Laptop firmly on LEFT (-1.20), text on right
        camX = 0.0;
        camY = 0.35;
        camZ = 5.0;
        lookX = 0.0;
        lookY = 0.0;

        lapX = -1.20;
        lapY = -0.18;
        lapRotX = 0.08;
        lapRotY = 0.28; // angled facing right towards Web content
        lapScale = 0.56;
      } else if (p < 0.74) {
        // 4. WEB -> APPLICATIONS TRANSITION (0.58 - 0.74): Laptop glides from LEFT (-1.20) back to RIGHT (+1.20)
        const t = smoothstep(0.58, 0.74, p);
        const arcDip = 0.26 * Math.sin(t * Math.PI);
        const camArcDip = 0.10 * Math.sin(t * Math.PI);

        lapX = -1.20 + (1.20 - (-1.20)) * t; // -1.20 -> +1.20 (Left to Right)
        lapY = -0.18 - arcDip;
        lapRotX = 0.08 + 0.03 * Math.sin(t * Math.PI);
        lapRotY = 0.28 + (-0.28 - 0.28) * t; // +0.28 -> -0.28 (angles to face left towards Applications text)
        lapScale = 0.56;

        camX = 0.0;
        camY = 0.35 - camArcDip;
        camZ = 5.0;
        lookX = 0.0;
        lookY = 0.0;
      } else if (p < 0.94) {
        // 5. SECTION 02 // APPLICATIONS HOLD (0.74 - 0.94): Laptop firmly on RIGHT (+1.20), text on left
        camX = 0.0;
        camY = 0.35;
        camZ = 5.0;
        lookX = 0.0;
        lookY = 0.0;

        lapX = 1.20;
        lapY = -0.18;
        lapRotX = 0.08;
        lapRotY = -0.28; // angled facing left towards Applications content
        lapScale = 0.56;
      } else {
        // 6. HANDOFF TO DOWNSTREAM SECTIONS (0.94 - 1.00)
        const t = smoothstep(0.94, 1.00, p);
        camX = 0.0;
        camY = 0.35 + 0.06 * t;
        camZ = 5.0 + 0.35 * t;
        lookX = 0.0;
        lookY = 0.0;

        lapX = 1.20;
        lapY = -0.18 - 0.08 * t;
        lapRotX = 0.08;
        lapRotY = -0.28;
        lapScale = 0.56;
      }
    }

    // Subtle idle floating suspension
    const floatY = Math.sin(time * 1.5) * 0.006;

    // Interactive cursor parallax (desktop only)
    let mouseCamX = 0;
    let mouseCamY = 0;
    let mouseLapRotY = 0;
    let mouseLapRotX = 0;

    if (!reducedMotion && !this.isMobile) {
      mouseCamX = mouse.x * 0.10;
      mouseCamY = mouse.y * 0.06;
      mouseLapRotY = mouse.x * 0.05;
      mouseLapRotX = -mouse.y * 0.03;
    }

    // Set target vectors
    this.targetCameraPos.set(camX + mouseCamX, camY + mouseCamY, camZ);
    this.targetCameraLookAt.set(lookX, lookY, 0);

    this.targetLaptopPos.set(lapX, lapY + floatY, lapZ);
    this.targetLaptopRot.set(lapRotX + mouseLapRotX, lapRotY + mouseLapRotY, 0);
    this.targetLaptopScale = lapScale;

    // Coordinated damped interpolation - responsive and smooth
    const lerpFactor = reducedMotion ? 0.14 : 0.11;
    this.currentCameraPos.lerp(this.targetCameraPos, lerpFactor);
    this.currentCameraLookAt.lerp(this.targetCameraLookAt, lerpFactor);

    this.currentLaptopPos.lerp(this.targetLaptopPos, lerpFactor);
    this.currentLaptopRot.x += (this.targetLaptopRot.x - this.currentLaptopRot.x) * lerpFactor;
    this.currentLaptopRot.y += (this.targetLaptopRot.y - this.currentLaptopRot.y) * lerpFactor;
    this.currentLaptopRot.z += (this.targetLaptopRot.z - this.currentLaptopRot.z) * lerpFactor;
    this.currentLaptopScale += (this.targetLaptopScale - this.currentLaptopScale) * lerpFactor;

    // Apply to camera
    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(this.currentCameraLookAt);
  }

  public getLaptopTransform(): LaptopTransform {
    return {
      position: this.currentLaptopPos,
      rotation: this.currentLaptopRot,
      scale: this.currentLaptopScale,
    };
  }
}
