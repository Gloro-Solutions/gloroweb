import * as THREE from "three";

export type ScreenSceneState = "hero" | "web" | "applications";

export class ScreenContentSystem {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public texture: THREE.CanvasTexture;

  private currentState: ScreenSceneState = "hero";
  private nextState: ScreenSceneState = "web";
  private transitionProgress = 0;
  private globalProgress = 0;

  private currentSubState = 0;
  private prevSubState = 0;
  private subTransitionProgress = 1;
  private targetSubState = 0;
  private currentVariant: ScreenSceneState = "hero";

  constructor(width = 1440, height = 900) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d", { alpha: false })!;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.render(0, 0);
  }

  public setSectionState(variant: ScreenSceneState, subState: number) {
    if (this.currentVariant !== variant) {
      this.currentVariant = variant;
      this.currentSubState = subState;
      this.targetSubState = subState;
      this.prevSubState = subState;
      this.subTransitionProgress = 1;
      return;
    }

    if (this.targetSubState !== subState) {
      this.prevSubState = this.currentSubState;
      this.targetSubState = subState;
      this.subTransitionProgress = 0;
    }
  }

  public renderSection(time: number, variant: ScreenSceneState, subState: number) {
    this.setSectionState(variant, subState);

    // Advance sub-state transition (smooth crossfade / slide over ~14 frames)
    if (this.subTransitionProgress < 1) {
      this.subTransitionProgress = Math.min(1, this.subTransitionProgress + 0.07);
      if (this.subTransitionProgress === 1) {
        this.currentSubState = this.targetSubState;
      }
    }

    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    // Deep technical canvas base
    ctx.fillStyle = "#070b14";
    ctx.fillRect(0, 0, w, h);

    // Top window bar and background grid
    this.drawShell(variant, time);

    // Render active scene content with crossfade & slide
    if (this.subTransitionProgress >= 0.99) {
      this.drawVariantSubState(variant, this.currentSubState, time, 1, 0);
    } else {
      // Previous sub-state slides up and fades out
      const fadeOutAlpha = 1 - this.subTransitionProgress;
      const slideOutY = -24 * this.subTransitionProgress;
      this.drawVariantSubState(variant, this.prevSubState, time, fadeOutAlpha, slideOutY);

      // New sub-state slides into place and fades in
      const fadeInAlpha = this.subTransitionProgress;
      const slideInY = 24 * (1 - this.subTransitionProgress);
      this.drawVariantSubState(variant, this.targetSubState, time, fadeInAlpha, slideInY);
    }

    this.texture.needsUpdate = true;
  }

  /**
   * Continuous global normalized progress (0.00 to 1.00)
   * 0.00 - 0.28: hero
   * 0.28 - 0.38: hero -> web transition
   * 0.38 - 0.58: web
   * 0.58 - 0.70: web -> applications transition
   * 0.70 - 1.00: applications
   */
  public setGlobalProgress(progress: number) {
    this.globalProgress = Math.max(0, Math.min(1, progress));

    if (this.globalProgress < 0.28) {
      this.currentState = "hero";
      this.nextState = "hero";
      this.transitionProgress = 0;
    } else if (this.globalProgress < 0.38) {
      this.currentState = "hero";
      this.nextState = "web";
      this.transitionProgress = (this.globalProgress - 0.28) / 0.10;
    } else if (this.globalProgress < 0.58) {
      this.currentState = "web";
      this.nextState = "web";
      this.transitionProgress = 0;
    } else if (this.globalProgress < 0.70) {
      this.currentState = "web";
      this.nextState = "applications";
      this.transitionProgress = (this.globalProgress - 0.58) / 0.12;
    } else {
      this.currentState = "applications";
      this.nextState = "applications";
      this.transitionProgress = 0;
    }
  }

  public render(time: number, globalProgress?: number) {
    if (globalProgress !== undefined) {
      this.setGlobalProgress(globalProgress);
    }

    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    // Deep technical canvas base
    ctx.fillStyle = "#070b14";
    ctx.fillRect(0, 0, w, h);

    if (this.transitionProgress <= 0.01) {
      this.drawScene(this.currentState, time, 1);
    } else if (this.transitionProgress >= 0.99) {
      this.drawScene(this.nextState, time, 1);
    } else {
      // Morphing blend
      this.drawScene(this.currentState, time, 1 - this.transitionProgress);
      this.drawScene(this.nextState, time, this.transitionProgress);
    }

    this.texture.needsUpdate = true;
  }

  private drawShell(state: ScreenSceneState, time: number) {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    // 1. Sleek Technical Background Grid
    ctx.strokeStyle = "rgba(0, 85, 255, 0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 72) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 72) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 2. Global Top Window Header
    ctx.fillStyle = "rgba(10, 16, 30, 0.94)";
    ctx.fillRect(0, 0, w, 56);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
    ctx.beginPath();
    ctx.moveTo(0, 56);
    ctx.lineTo(w, 56);
    ctx.stroke();

    // Studio window controls (Monochrome + Gloro Blue discipline)
    const dots = ["#334155", "#475569", "#0055ff"];
    dots.forEach((color, idx) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(36 + idx * 20, 28, 5.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Window Title
    ctx.font = "600 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#f8fafc";
    ctx.fillText("GLORO SOLUTIONS // SYSTEM RUNTIME", 110, 33);

    // Global Status Indicator (Strict Gloro Blue + Navy)
    ctx.fillStyle = "rgba(0, 85, 255, 0.14)";
    ctx.fillRect(w - 290, 14, 260, 28);
    ctx.strokeStyle = "rgba(0, 85, 255, 0.45)";
    ctx.strokeRect(w - 290, 14, 260, 28);

    // Subtle pulsing blue connection light
    const pulseOpacity = 0.5 + 0.5 * Math.sin(time * 3);
    ctx.fillStyle = `rgba(0, 85, 255, ${pulseOpacity})`;
    ctx.beginPath();
    ctx.arc(w - 272, 28, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#93c5fd";
    ctx.font = "600 12px monospace";
    const stateTag =
      state === "hero"
        ? `CORE: 0${this.currentSubState + 1} LIVE`
        : state === "web"
        ? `WEB: 0${this.currentSubState + 1} METRICS`
        : `APP: 0${this.currentSubState + 1} CLUSTER`;
    ctx.fillText(stateTag, w - 258, 33);
  }

  private drawVariantSubState(
    variant: ScreenSceneState,
    subState: number,
    time: number,
    alpha: number,
    offsetY: number
  ) {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.translate(0, offsetY);

    if (variant === "hero") {
      this.drawHeroSubScene(subState, time);
    } else if (variant === "web") {
      this.drawWebSubScene(subState, time);
    } else if (variant === "applications") {
      this.drawApplicationsSubScene(subState, time);
    }

    ctx.restore();
  }

  private drawScene(state: ScreenSceneState, time: number, alpha: number) {
    this.drawShell(state, time);
    this.drawVariantSubState(state, 0, time, alpha, 0);
  }

  /* =========================================================================
     SCENE 01: HERO SUB-STATES
     ========================================================================= */
  private drawHeroSubScene(subState: number, time: number) {
    const { ctx, canvas } = this;
    const w = canvas.width;

    if (subState === 0) {
      // SUB-STATE 0: SYSTEM OVERVIEW & ARCHITECTURE
      ctx.fillStyle = "rgba(13, 22, 40, 0.85)";
      ctx.fillRect(64, 92, 780, 484);
      ctx.strokeStyle = "rgba(0, 85, 255, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(64, 92, 780, 484);

      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 12px monospace";
      ctx.fillText("// ARCHITECTURE & AUTONOMOUS SYSTEMS", 96, 138);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("ENGINEERING DIGITAL SYSTEMS", 96, 196);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(
        "High-performance web applications, cloud architecture, and digital products.",
        96,
        240
      );

      // Animated Real-Time Waveform
      ctx.strokeStyle = "#0055ff";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const waveY = 370;
      for (let x = 96; x <= 780; x += 10) {
        const amp = 36 * Math.sin(time * 2.2 + x * 0.015);
        const y = waveY + amp * Math.cos(x * 0.02 + time * 0.8);
        if (x === 96) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Right Side Telemetry Nodes
      const nodes = [
        { label: "FRONTEND PERFORMANCE", val: "99.8 SCORE", sub: "Core Web Vitals" },
        { label: "EDGE INFRASTRUCTURE", val: "8ms LATENCY", sub: "Global Multi-Region" },
        { label: "STATE SYNCHRONIZATION", val: "DISTRIBUTED", sub: "Real-Time WebSocket" },
        { label: "SYSTEM RELIABILITY", val: "99.99% UPTIME", sub: "Production SLA" },
      ];

      nodes.forEach((node, i) => {
        const ny = 92 + i * 118;
        ctx.fillStyle = "rgba(13, 22, 40, 0.75)";
        ctx.fillRect(880, ny, 496, 98);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
        ctx.strokeRect(880, ny, 496, 98);

        ctx.fillStyle = "#0055ff";
        ctx.font = "bold 12px monospace";
        ctx.fillText(`TELEMETRY 0${i + 1}`, 904, ny + 32);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 17px -apple-system, sans-serif";
        ctx.fillText(node.label, 904, ny + 64);

        ctx.fillStyle = "#93c5fd";
        ctx.font = "bold 14px monospace";
        ctx.fillText(node.val, 1220, ny + 64);

        ctx.fillStyle = "#64748b";
        ctx.font = "12px -apple-system, sans-serif";
        ctx.fillText(node.sub, 904, ny + 86);
      });
    } else if (subState === 1) {
      // SUB-STATE 1: GLOBAL EDGE MESH & TELEMETRY
      ctx.fillStyle = "rgba(13, 22, 40, 0.85)";
      ctx.fillRect(64, 92, 780, 484);
      ctx.strokeStyle = "rgba(0, 85, 255, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(64, 92, 780, 484);

      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 12px monospace";
      ctx.fillText("// GLOBAL EDGE TELEMETRY & CLUSTER MESH", 96, 138);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("DISTRIBUTED EDGE RUNTIME", 96, 196);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(
        "Low-latency computing nodes synchronized across multi-region backbone clusters.",
        96,
        240
      );

      // Edge Region Pulse Grid
      const edgeRegions = [
        { name: "US-EAST-1", lat: "4ms", load: "34%" },
        { name: "US-WEST-2", lat: "6ms", load: "28%" },
        { name: "EU-CENTRAL-1", lat: "9ms", load: "42%" },
        { name: "APAC-SINGAPORE", lat: "14ms", load: "31%" },
      ];

      edgeRegions.forEach((reg, i) => {
        const rx = 96 + (i % 2) * 350;
        const ry = 310 + Math.floor(i / 2) * 110;
        ctx.fillStyle = "rgba(18, 29, 52, 0.85)";
        ctx.fillRect(rx, ry, 330, 92);
        ctx.strokeStyle = "rgba(0, 85, 255, 0.35)";
        ctx.strokeRect(rx, ry, 330, 92);

        ctx.fillStyle = "#60a5fa";
        ctx.font = "bold 12px monospace";
        ctx.fillText(reg.name, rx + 20, ry + 32);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 20px monospace";
        ctx.fillText(reg.lat, rx + 20, ry + 68);

        ctx.fillStyle = "#10b981";
        ctx.font = "bold 12px monospace";
        ctx.fillText(`HEALTHY // LOAD ${reg.load}`, rx + 140, ry + 68);
      });

      // Right Side Cluster Nodes
      const nodes = [
        { label: "CLUSTER SYNCHRONIZATION", val: "100%", sub: "Zero Outage Guarantee" },
        { label: "REQUEST BACKPRESSURE", val: "0.00%", sub: "Adaptive Rate Buffer" },
        { label: "SECURITY COMPLIANCE", val: "SOC-2 TYPE II", sub: "Automated IAM Shield" },
        { label: "FAILOVER RECOVERY", val: "< 120ms", sub: "Autonomous Edge Reroute" },
      ];

      nodes.forEach((node, i) => {
        const ny = 92 + i * 118;
        ctx.fillStyle = "rgba(13, 22, 40, 0.75)";
        ctx.fillRect(880, ny, 496, 98);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
        ctx.strokeRect(880, ny, 496, 98);

        ctx.fillStyle = "#0055ff";
        ctx.font = "bold 12px monospace";
        ctx.fillText(`CLUSTER MESH 0${i + 1}`, 904, ny + 32);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 17px -apple-system, sans-serif";
        ctx.fillText(node.label, 904, ny + 64);

        ctx.fillStyle = "#93c5fd";
        ctx.font = "bold 14px monospace";
        ctx.fillText(node.val, 1220, ny + 64);

        ctx.fillStyle = "#64748b";
        ctx.font = "12px -apple-system, sans-serif";
        ctx.fillText(node.sub, 904, ny + 86);
      });
    } else {
      // SUB-STATE 2: ZERO-DOWNTIME CI/CD PIPELINE
      ctx.fillStyle = "rgba(13, 22, 40, 0.9)";
      ctx.fillRect(64, 92, 1312, 484);
      ctx.strokeStyle = "rgba(0, 85, 255, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(64, 92, 1312, 484);

      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 13px monospace";
      ctx.fillText("// CI/CD AUTOMATION & COMPILATION BENCHMARK", 96, 140);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("ZERO-DOWNTIME TURBOPACK PIPELINE", 96, 196);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(
        "Instant incremental compilation, type safety guarantees, and automated production rollout.",
        96,
        240
      );

      const metrics = [
        { title: "COMPILATION SPEED", val: "420ms", sub: "Turbopack 16.3" },
        { title: "STATIC BUNDLE", val: "84 KB", sub: "Zero-bloat Tree Shaking" },
        { title: "EDGE ROUTES", val: "12 REGIONS", sub: "Instant Worldwide Deployment" },
      ];

      metrics.forEach((m, idx) => {
        const mx = 96 + idx * 420;
        ctx.fillStyle = "rgba(18, 29, 52, 0.8)";
        ctx.fillRect(mx, 310, 390, 190);
        ctx.strokeStyle = "rgba(0, 85, 255, 0.3)";
        ctx.strokeRect(mx, 310, 390, 190);

        ctx.fillStyle = "#60a5fa";
        ctx.font = "bold 12px monospace";
        ctx.fillText(m.title, mx + 24, 348);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 36px monospace";
        ctx.fillText(m.val, mx + 24, 404);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "14px -apple-system, sans-serif";
        ctx.fillText(m.sub, mx + 24, 452);
      });
    }

    // Bottom Terminal Stream
    ctx.fillStyle = "rgba(10, 16, 28, 0.95)";
    ctx.fillRect(64, 612, 1312, 220);
    ctx.strokeStyle = "rgba(0, 85, 255, 0.28)";
    ctx.strokeRect(64, 612, 1312, 220);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "14px monospace";
    ctx.fillText("gloro@production:~$ ./deploy_system.sh --target=enterprise", 96, 656);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px monospace";
    ctx.fillText("[OK] Next.js 16.3 / React 19.2 compilation complete (1.4s)", 96, 696);
    ctx.fillText("[OK] Edge cluster synchronized across 12 distributed regions", 96, 732);
    ctx.fillText("[LIVE] Ready for mission-critical client deployments.", 96, 768);
  }

  /* =========================================================================
     SCENE 02: WEB EXPERIENCES SUB-STATES
     ========================================================================= */
  private drawWebSubScene(subState: number, time: number) {
    const { ctx, canvas } = this;
    const w = canvas.width;

    ctx.fillStyle = "rgba(13, 22, 40, 0.88)";
    ctx.fillRect(64, 92, 1312, 504);
    ctx.strokeStyle = "rgba(0, 85, 255, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(64, 92, 1312, 504);

    if (subState === 0) {
      // 0: 60 FPS WEBGL MOTION
      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 13px monospace";
      ctx.fillText("// DOMAIN 01: DIGITAL ENGINEERING", 96, 142);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("WEB EXPERIENCES & WEBGL", 96, 206);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(
        "Awwwards-quality interactive platforms, headless architectures, and 60 FPS WebGL motion.",
        96,
        252
      );

      const webCards = [
        { num: "99.8", title: "Core Web Vitals", desc: "Sub-second LCP and zero layout shift" },
        { num: "60 FPS", title: "WebGL Interaction", desc: "Hardware-accelerated kinetic 3D systems" },
        { num: "12ms", title: "Edge Cache Hit", desc: "Global CDN multi-region instant delivery" },
      ];

      webCards.forEach((card, idx) => {
        const cx = 96 + idx * 420;
        ctx.fillStyle = "rgba(18, 29, 52, 0.75)";
        ctx.fillRect(cx, 310, 390, 192);
        ctx.strokeStyle = "rgba(0, 85, 255, 0.35)";
        ctx.strokeRect(cx, 310, 390, 192);

        const animatedWidth = 390 * (0.8 + 0.2 * Math.sin(time * 1.5 + idx));
        ctx.fillStyle = "#0055ff";
        ctx.fillRect(cx, 310, Math.min(390, animatedWidth), 3);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 38px monospace";
        ctx.fillText(card.num, cx + 24, 376);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 18px -apple-system, sans-serif";
        ctx.fillText(card.title, cx + 24, 420);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "13px -apple-system, sans-serif";
        ctx.fillText(card.desc, cx + 24, 454);
      });
    } else if (subState === 1) {
      // 1: PERFORMANCE AUDIT (CWV)
      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 13px monospace";
      ctx.fillText("// DOMAIN 01: PERFORMANCE AUDIT", 96, 142);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("SUB-SECOND CORE WEB VITALS", 96, 206);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(
        "Validated Lighthouse 100 benchmark: instantaneous response times with zero layout shift.",
        96,
        252
      );

      const webCards = [
        { num: "0.4s", title: "Largest Contentful Paint", desc: "Instant visual confirmation" },
        { num: "0.00", title: "Cumulative Layout Shift", desc: "Stable mathematical layout grid" },
        { num: "14ms", title: "Interaction to Next Paint", desc: "Instantaneous tactile feedback" },
      ];

      webCards.forEach((card, idx) => {
        const cx = 96 + idx * 420;
        ctx.fillStyle = "rgba(18, 29, 52, 0.75)";
        ctx.fillRect(cx, 310, 390, 192);
        ctx.strokeStyle = "rgba(0, 85, 255, 0.35)";
        ctx.strokeRect(cx, 310, 390, 192);

        ctx.fillStyle = "#10b981";
        ctx.fillRect(cx, 310, 390, 3);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 38px monospace";
        ctx.fillText(card.num, cx + 24, 376);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 18px -apple-system, sans-serif";
        ctx.fillText(card.title, cx + 24, 420);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "13px -apple-system, sans-serif";
        ctx.fillText(card.desc, cx + 24, 454);
      });
    } else {
      // 2: SWISS TYPOGRAPHIC DISCIPLINE
      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 13px monospace";
      ctx.fillText("// DOMAIN 01: ARCHITECTURAL DESIGN SYSTEM", 96, 142);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("SWISS TYPOGRAPHIC PRECISION", 96, 206);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(
        "A rigorous 12-column grid, fluid clamp typographic hierarchy, and responsive discipline.",
        96,
        252
      );

      const webCards = [
        { num: "12-COL", title: "Grid Architecture", desc: "Rigorous vertical and baseline alignment" },
        { num: "FLUID", title: "Responsive Clamp", desc: "Mathematical viewport typography scale" },
        { num: "AAA", title: "WCAG Accessibility", desc: "High contrast readability compliance" },
      ];

      webCards.forEach((card, idx) => {
        const cx = 96 + idx * 420;
        ctx.fillStyle = "rgba(18, 29, 52, 0.75)";
        ctx.fillRect(cx, 310, 390, 192);
        ctx.strokeStyle = "rgba(0, 85, 255, 0.35)";
        ctx.strokeRect(cx, 310, 390, 192);

        ctx.fillStyle = "#0055ff";
        ctx.fillRect(cx, 310, 390, 3);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 38px monospace";
        ctx.fillText(card.num, cx + 24, 376);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 18px -apple-system, sans-serif";
        ctx.fillText(card.title, cx + 24, 420);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "13px -apple-system, sans-serif";
        ctx.fillText(card.desc, cx + 24, 454);
      });
    }

    // Bottom Navigation Bar
    ctx.fillStyle = "rgba(10, 16, 28, 0.95)";
    ctx.fillRect(64, 630, 1312, 196);
    ctx.strokeStyle = "rgba(0, 85, 255, 0.28)";
    ctx.strokeRect(64, 630, 1312, 196);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px monospace";
    ctx.fillText("ACTIVE PIPELINE: NEXT.JS 16 // REACT 19 // GSAP SCROLLTRIGGER", 96, 680);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px -apple-system, sans-serif";
    ctx.fillText(
      "Scroll continues into full interactive case studies and engineering systems.",
      96,
      722
    );

    const reqPerSec = Math.floor(142000 + Math.sin(time * 4) * 6000).toLocaleString();
    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`STREAM: ${reqPerSec} REQ/SEC`, 96, 762);
  }

  private drawHeroScene(time: number) {
    this.drawHeroSubScene(0, time);
  }

  private drawWebScene(time: number) {
    this.drawWebSubScene(0, time);
  }

  /* =========================================================================
     SCENE 03: APPLICATIONS (Enterprise SaaS Cloud OS Dashboard)
     ========================================================================= */
  private drawApplicationsSubScene(subState: number, time: number) {
    const { ctx, canvas } = this;
    const w = canvas.width;

    // 1. LEFT SIDEBAR NAVIGATION
    const sidebarW = 260;
    ctx.fillStyle = "rgba(10, 16, 30, 0.98)";
    ctx.fillRect(64, 92, sidebarW, 734);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
    ctx.strokeRect(64, 92, sidebarW, 734);

    // Workspace Brand Tag
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 15px -apple-system, sans-serif";
    ctx.fillText("GLORO // ENTERPRISE", 88, 136);

    ctx.fillStyle = "#64748b";
    ctx.font = "11px monospace";
    ctx.fillText("WORKSPACE: PROD-ALPHA", 88, 160);

    // Highlight sidebar items based on subState
    const navItems = [
      { name: "Overview", count: "ACTIVE", active: subState === 0 },
      { name: "Workflows", count: "24", active: subState === 1 },
      { name: "Cloud Clusters", count: "12", active: false },
      { name: "Telemetry", count: "148k/s", active: subState >= 2 },
      { name: "Security & IAM", count: "SOC-2", active: false },
    ];

    navItems.forEach((item, idx) => {
      const iy = 200 + idx * 56;
      if (item.active) {
        ctx.fillStyle = "rgba(0, 85, 255, 0.18)";
        ctx.fillRect(72, iy, sidebarW - 16, 44);
        ctx.fillStyle = "#0055ff";
        ctx.fillRect(72, iy, 4, 44);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px -apple-system, sans-serif";
        ctx.fillText(item.name, 92, iy + 27);

        ctx.fillStyle = "#93c5fd";
        ctx.font = "bold 11px monospace";
        ctx.fillText(item.count, 240, iy + 27);
      } else {
        ctx.fillStyle = "#94a3b8";
        ctx.font = "500 14px -apple-system, sans-serif";
        ctx.fillText(item.name, 92, iy + 27);

        ctx.fillStyle = "#475569";
        ctx.font = "11px monospace";
        ctx.fillText(item.count, 248, iy + 27);
      }
    });

    // Sidebar bottom system heartbeat
    ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
    ctx.fillRect(80, 730, sidebarW - 32, 70);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
    ctx.strokeRect(80, 730, sidebarW - 32, 70);

    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 11px monospace";
    ctx.fillText("CORE RUNTIME", 96, 755);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 13px -apple-system, sans-serif";
    ctx.fillText("CLUSTER US-EAST-1", 96, 778);

    // 2. MAIN DASHBOARD CONTENT AREA
    const mainX = 64 + sidebarW + 20;
    const mainW = w - mainX - 64;

    // Top Workspace Header
    ctx.fillStyle = "rgba(13, 22, 40, 0.88)";
    ctx.fillRect(mainX, 92, mainW, 64);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
    ctx.strokeRect(mainX, 92, mainW, 64);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 18px -apple-system, sans-serif";
    ctx.fillText("MISSION CONTROL // DISTRIBUTED SYSTEMS", mainX + 24, 131);

    // Live search input pill
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(mainX + mainW - 340, 106, 320, 36);
    ctx.strokeStyle = "rgba(0, 85, 255, 0.35)";
    ctx.strokeRect(mainX + mainW - 340, 106, 320, 36);

    ctx.fillStyle = "#64748b";
    ctx.font = "13px monospace";
    ctx.fillText("Search workflows, nodes, APIs...", mainX + mainW - 324, 129);

    // 3 Metric Panels (Firm Gloro Blue, White, Dark Navy)
    const metrics = [
      {
        title: "ACTIVE WORKFLOWS",
        val: "24 / 24",
        sub: "All pipeline nodes healthy",
      },
      {
        title: "EVENT THROUGHPUT",
        val: `${Math.floor(148200 + Math.sin(time * 3) * 4500).toLocaleString()}/s`,
        sub: "Peak event ingestion rate",
      },
      {
        title: "AI AGENT CLUSTER",
        val: "12 NODES",
        sub: "Distributed orchestration",
      },
    ];

    const cardW = (mainW - 32) / 3;
    metrics.forEach((m, idx) => {
      const mx = mainX + idx * (cardW + 16);
      ctx.fillStyle = "rgba(13, 22, 40, 0.9)";
      ctx.fillRect(mx, 174, cardW, 140);
      ctx.strokeStyle = "rgba(0, 85, 255, 0.35)";
      ctx.strokeRect(mx, 174, cardW, 140);

      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 11px monospace";
      ctx.fillText(m.title, mx + 20, 204);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px monospace";
      ctx.fillText(m.val, mx + 20, 252);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px -apple-system, sans-serif";
      ctx.fillText(m.sub, mx + 20, 286);
    });

    // 3. EXECUTION FLOW GRAPH / NODE NETWORK
    const graphY = 332;
    const graphH = 264;
    ctx.fillStyle = "rgba(10, 16, 30, 0.95)";
    ctx.fillRect(mainX, graphY, mainW, graphH);
    ctx.strokeStyle = "rgba(0, 85, 255, 0.28)";
    ctx.strokeRect(mainX, graphY, mainW, graphH);

    ctx.fillStyle = "#0055ff";
    ctx.font = "bold 12px monospace";
    ctx.fillText("// DISTRIBUTED EXECUTION TOPOLOGY", mainX + 24, graphY + 34);

    // Render node graph
    const nodeCoords = [
      { x: mainX + 90, y: graphY + 140, label: "API Gateway" },
      { x: mainX + 280, y: graphY + 95, label: "Auth Mesh" },
      { x: mainX + 280, y: graphY + 185, label: "Event Bus" },
      { x: mainX + 510, y: graphY + 80, label: "Workflow Eng." },
      { x: mainX + 510, y: graphY + 200, label: "State Cache" },
      { x: mainX + 750, y: graphY + 140, label: "AI Agent Farm" },
      { x: mainX + 920, y: graphY + 140, label: "DB Storage" },
    ];

    // Connect nodes with animated pulse curves
    ctx.strokeStyle = "rgba(0, 85, 255, 0.4)";
    ctx.lineWidth = 2;
    const connections = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 5],
      [4, 5],
      [5, 6],
    ];

    connections.forEach(([from, to]) => {
      const p1 = nodeCoords[from];
      const p2 = nodeCoords[to];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      const cpX = (p1.x + p2.x) / 2;
      ctx.bezierCurveTo(cpX, p1.y, cpX, p2.y, p2.x, p2.y);
      ctx.stroke();

      // Traveling data packets
      const pulseT = (time * 0.8 + from * 0.2) % 1;
      const px = (1 - pulseT) * (1 - pulseT) * p1.x + 2 * (1 - pulseT) * pulseT * cpX + pulseT * pulseT * p2.x;
      const py = (1 - pulseT) * (1 - pulseT) * p1.y + 2 * (1 - pulseT) * pulseT * p2.y + pulseT * pulseT * p2.y;
      ctx.fillStyle = "#93c5fd";
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw node capsules
    nodeCoords.forEach((node) => {
      ctx.fillStyle = "#0d1527";
      ctx.fillRect(node.x - 48, node.y - 18, 96, 36);
      ctx.strokeStyle = "#0055ff";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(node.x - 48, node.y - 18, 96, 36);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y + 4);
      ctx.textAlign = "left";
    });

    // 4. BOTTOM REAL-TIME ACTIVITY STREAM
    const logY = graphY + graphH + 16;
    const logH = 214;
    ctx.fillStyle = "rgba(10, 16, 28, 0.98)";
    ctx.fillRect(mainX, logY, mainW, logH);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
    ctx.strokeRect(mainX, logY, mainW, logH);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 12px monospace";
    ctx.fillText("LIVE SYSTEM AUDIT LOG // REAL-TIME TELEMETRY", mainX + 24, logY + 32);

    const logLines = [
      "[SYSTEM] 24 autonomous workflow pipelines executing with 0 backpressure",
      "[AI-CLUSTER] Inference load re-balanced across 12 distributed worker nodes (avg 9ms)",
      "[EDGE-SYNC] Global cache validation confirmed across US, EU, and APAC edge regions",
      "[SECURITY] Zero anomalous request patterns detected. SOC-2 compliance enforced",
    ];

    logLines.forEach((line, idx) => {
      ctx.fillStyle = idx === 0 ? "#f8fafc" : "#94a3b8";
      ctx.font = "12px monospace";
      ctx.fillText(line, mainX + 24, logY + 68 + idx * 36);
    });
  }

  public dispose() {
    this.texture.dispose();
  }
}
