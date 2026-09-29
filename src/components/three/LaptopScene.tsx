"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { setupStudioLighting } from "./Lighting";
import { loadLaptopModel, LaptopInstance } from "./LaptopModel";
import { LaptopFallback } from "./LaptopFallback";
import { CameraRig } from "./CameraRig";
import { useLaptopInteraction } from "./useLaptopInteraction";

export interface LaptopSceneProps {
  scrollProgressRef?: React.RefObject<number>;
  currentProgress?: number;
  className?: string;
  variant?: "hero" | "web" | "applications";
  screenState?: number;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!(window.WebGLRenderingContext && gl);
  } catch {
    return false;
  }
}

export function LaptopScene({
  scrollProgressRef,
  currentProgress = 0,
  className = "",
  variant,
  screenState = 0,
}: LaptopSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const progressPropRef = useRef(currentProgress);
  progressPropRef.current = currentProgress;

  const { mouseRef, updateDamping, isMobile, prefersReducedMotion } = useLaptopInteraction();

  useEffect(() => {
    if (useFallback) return;

    if (!checkWebGLSupport()) {
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let cameraRig: CameraRig | null = null;
    let laptopInstance: LaptopInstance | null = null;
    let laptopGroup: THREE.Group | null = null;
    let animId: number | null = null;

    try {
      scene = new THREE.Scene();
      cameraRig = new CameraRig(width / height);
      cameraRig.resize(width / height, isMobile);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;

      setupStudioLighting(scene, renderer);

      loadLaptopModel()
        .then((instance) => {
          if (!scene) return;
          laptopInstance = instance;
          laptopGroup = instance.group;

          // Initial placement from cameraRig
          const initialProgress = scrollProgressRef?.current ?? progressPropRef.current ?? 0;
          cameraRig?.update({ x: 0, y: 0 }, initialProgress, prefersReducedMotion, 0);
          const initialTransform = cameraRig?.getLaptopTransform();

          if (initialTransform) {
            laptopGroup.position.copy(initialTransform.position);
            laptopInstance.modelContainer.rotation.copy(initialTransform.rotation);
            laptopGroup.scale.setScalar(initialTransform.scale);
          }

          scene.add(laptopGroup);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.warn("Failed to load /models/gloro-laptop.glb, using fallback:", err);
          setUseFallback(true);
        });
    } catch (err) {
      console.warn("WebGL initialization failed, falling back to CSS laptop:", err);
      setUseFallback(true);
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && renderer && cameraRig) {
          width = newW;
          height = newH;
          renderer.setSize(width, height);
          const isMob = width < 1024;
          cameraRig.resize(width / height, isMob);
        }
      }
    });
    resizeObserver.observe(container);

    const startTime = performance.now();

    const renderLoop = () => {
      if (!renderer || !scene || !cameraRig) return;
      const time = (performance.now() - startTime) * 0.001;

      // Current global scroll progress
      let p = scrollProgressRef?.current ?? progressPropRef.current ?? 0;

      // Handle standalone section variant if passed
      if (variant) {
        p = variant === "hero" ? 0.14 : variant === "web" ? 0.48 : 0.82;
      }

      // Smooth mouse damping
      const dampedMouse = updateDamping(0.08);

      // Unified spatial choreography update for camera and laptop
      cameraRig.update(dampedMouse, p, prefersReducedMotion, time);

      // Apply coordinated transforms to the single laptop model instance
      if (laptopGroup && laptopInstance) {
        const transform = cameraRig.getLaptopTransform();
        laptopGroup.position.copy(transform.position);
        laptopInstance.modelContainer.rotation.copy(transform.rotation);
        laptopGroup.scale.setScalar(transform.scale);

        // Update dynamic screen content (metrics, waveforms, terminal, dashboard)
        laptopInstance.update(time, p);
      }

      renderer.render(scene, cameraRig.camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      if (laptopInstance) {
        laptopInstance.dispose();
      }

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [isMobile, prefersReducedMotion, scrollProgressRef, variant]);

  if (useFallback) {
    const fallbackProgress = scrollProgressRef?.current ?? currentProgress ?? 0;
    const computedVariant = variant || (fallbackProgress < 0.32 ? "hero" : fallbackProgress < 0.65 ? "web" : "applications");
    return (
      <LaptopFallback
        variant={computedVariant}
        screenState={screenState}
        className={className}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}
      aria-label="High-Performance 3D Laptop Visualization"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 text-slate-500 font-mono text-[11px] shadow-xs backdrop-blur-xs">
            <div className="w-3 h-3 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
            <span>CALIBRATING 3D ENVIRONMENT...</span>
          </div>
        </div>
      )}
    </div>
  );
}
