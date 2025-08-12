interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  trail: { x: number; y: number; opacity: number }[];
  hue: number;
  twinklePhase: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  centerX: number;
  centerY: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number; opacity: number }[];
  hue: number;
}

class StarryNightVisualization {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private shootingStars: ShootingStar[] = [];
  private animationId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private time = 0;
  private width = 0;
  private height = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initStars();
    this.setupEventListeners();
  }

  private resize(): void {
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Set canvas to 100% width and height of the viewport
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Update canvas style to fill the entire screen with transparent background
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1'; // Keep it in background
    this.canvas.style.backgroundColor = 'transparent';
    this.canvas.style.pointerEvents = 'none'; // Allow clicks to pass through

    this.canvas.width = this.width * devicePixelRatio;
    this.canvas.height = this.height * devicePixelRatio;

    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      this.resize();
      this.initStars();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.canvas.addEventListener('click', () => {
      this.createShootingStar();
    });
  }

  private initStars(): void {
    this.stars = [];
    const starCount = Math.floor((this.width * this.height) / 8000);

    // Create multiple orbital centers for circular motion effect
    const centers = [
      { x: this.width * 0.3, y: this.height * 0.3 },
      { x: this.width * 0.7, y: this.height * 0.4 },
      { x: this.width * 0.5, y: this.height * 0.6 },
      { x: this.width * 0.2, y: this.height * 0.7 },
      { x: this.width * 0.8, y: this.height * 0.2 },
    ];

    for (let i = 0; i < starCount; i++) {
      const center = centers[Math.floor(Math.random() * centers.length)];
      const orbitRadius = Math.random() * Math.min(this.width, this.height) * 0.4;
      const orbitAngle = Math.random() * Math.PI * 2;

      const star: Star = {
        x: center.x + Math.cos(orbitAngle) * orbitRadius,
        y: center.y + Math.sin(orbitAngle) * orbitRadius,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 2.25 + 0.5,
        opacity: Math.random() + 0.5, // Increased minimum opacity for better visibility
        trail: [],
        hue: Math.random() * 120 + 200, // Blue to purple range with some variation (200-320)
        twinklePhase: Math.random() * Math.PI * 2,
        orbitRadius,
        orbitAngle,
        orbitSpeed: (Math.random() * 0.002 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
        centerX: center.x,
        centerY: center.y,
      };

      this.stars.push(star);
    }
  }

  private createShootingStar(): void {
    const side = Math.floor(Math.random() * 4);
    let x, y, vx, vy;

    switch (side) {
      case 0: // Top
        x = Math.random() * this.width;
        y = -10;
        vx = (Math.random() - 0.5) * 4;
        vy = Math.random() * 3 + 2;
        break;
      case 1: // Right
        x = this.width + 10;
        y = Math.random() * this.height;
        vx = -(Math.random() * 3 + 2);
        vy = (Math.random() - 0.5) * 4;
        break;
      case 2: // Bottom
        x = Math.random() * this.width;
        y = this.height + 10;
        vx = (Math.random() - 0.5) * 4;
        vy = -(Math.random() * 3 + 2);
        break;
      default: // Left
        x = -10;
        y = Math.random() * this.height;
        vx = Math.random() * 3 + 2;
        vy = (Math.random() - 0.5) * 4;
    }

    const shootingStar: ShootingStar = {
      x,
      y,
      vx,
      vy,
      life: 100,
      maxLife: 100,
      trail: [],
      hue: Math.random() * 120 + 200, // More subtle color range for shooting stars
    };

    this.shootingStars.push(shootingStar);
  }

  private updateStars(): void {
    this.stars.forEach((star) => {
      // Orbital motion inspired by star trail photography
      star.orbitAngle += star.orbitSpeed;
      const targetX = star.centerX + Math.cos(star.orbitAngle) * star.orbitRadius;
      const targetY = star.centerY + Math.sin(star.orbitAngle) * star.orbitRadius;

      // Smooth interpolation to target position
      star.x += (targetX - star.x) * 0.02;
      star.y += (targetY - star.y) * 0.02;

      // Add slight random movement
      star.x += star.vx;
      star.y += star.vy;

      // Twinkling effect
      star.twinklePhase += 0.05;
      star.opacity = 0.3 + Math.sin(star.twinklePhase) * 0.4;

      // Add to trail
      star.trail.push({ x: star.x, y: star.y, opacity: star.opacity });
      if (star.trail.length > 20) {
        star.trail.shift();
      }

      // Mouse interaction - subtle attraction
      const dx = this.mouseX - star.x;
      const dy = this.mouseY - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = 0.001;
        star.vx += (dx / distance) * force;
        star.vy += (dy / distance) * force;
      }

      // Damping
      star.vx *= 0.98;
      star.vy *= 0.98;
    });
  }

  private updateShootingStars(): void {
    this.shootingStars = this.shootingStars.filter((shootingStar) => {
      shootingStar.x += shootingStar.vx;
      shootingStar.y += shootingStar.vy;
      shootingStar.life--;

      // Add to trail
      shootingStar.trail.push({
        x: shootingStar.x,
        y: shootingStar.y,
        opacity: shootingStar.life / shootingStar.maxLife,
      });

      if (shootingStar.trail.length > 15) {
        shootingStar.trail.shift();
      }

      return (
        shootingStar.life > 0 &&
        shootingStar.x > -50 &&
        shootingStar.x < this.width + 50 &&
        shootingStar.y > -50 &&
        shootingStar.y < this.height + 50
      );
    });
  }

  private drawBackground(): void {
    // Create gradient background mimicking night sky
    const gradient = this.ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      0,
      this.width / 2,
      this.height / 2,
      Math.max(this.width, this.height) / 2
    );

    gradient.addColorStop(0, 'rgba(10, 15, 35, 1)');
    gradient.addColorStop(0.5, 'rgba(5, 10, 25, 1)');
    gradient.addColorStop(1, 'rgba(2, 5, 15, 1)');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Add some subtle noise/texture
    this.ctx.globalAlpha = 0.1;
    for (let i = 0; i < 100; i++) {
      this.ctx.fillStyle = `hsl(${Math.random() * 60 + 200}, 30%, 50%)`;
      this.ctx.fillRect(Math.random() * this.width, Math.random() * this.height, 1, 1);
    }
    this.ctx.globalAlpha = 1;
  }

  private drawStars(): void {
    this.stars.forEach((star) => {
      // Draw star trail
      if (star.trail.length > 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(star.trail[0].x, star.trail[0].y);

        for (let i = 1; i < star.trail.length; i++) {
          this.ctx.lineTo(star.trail[i].x, star.trail[i].y);
        }

        this.ctx.strokeStyle = `hsla(${star.hue}, 90%, 60%, ${star.opacity * 0.6})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();
      }

      // Draw star with glow effect
      const glowSize = star.radius * 4;

      // Outer glow - more vibrant and visible
      const glowGradient = this.ctx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        glowSize
      );
      glowGradient.addColorStop(0, `hsla(${star.hue}, 70%, 75%, ${star.opacity * 0.8})`);
      glowGradient.addColorStop(1, `hsla(${star.hue}, 70%, 75%, 0)`);

      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
      this.ctx.fill();

      // Main star - slightly brighter for better visibility
      this.ctx.fillStyle = `hsla(${star.hue}, 80%, 70%, ${star.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Star spikes for brighter stars - slightly brighter
      if (star.radius > 1.5) {
        this.ctx.strokeStyle = `hsla(${star.hue}, 70%, 65%, ${star.opacity * 0.8})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();

        // Vertical spike
        this.ctx.moveTo(star.x, star.y - star.radius * 3);
        this.ctx.lineTo(star.x, star.y + star.radius * 3);

        // Horizontal spike
        this.ctx.moveTo(star.x - star.radius * 3, star.y);
        this.ctx.lineTo(star.x + star.radius * 3, star.y);

        this.ctx.stroke();
      }
    });
  }

  private drawShootingStars(): void {
    this.shootingStars.forEach((shootingStar) => {
      if (shootingStar.trail.length > 1) {
        // Draw shooting star trail with gradient
        for (let i = 1; i < shootingStar.trail.length; i++) {
          const prev = shootingStar.trail[i - 1];
          const curr = shootingStar.trail[i];
          const alpha = (i / shootingStar.trail.length) * curr.opacity;

          this.ctx.strokeStyle = `hsla(${shootingStar.hue}, 80%, 75%, ${alpha})`;
          this.ctx.lineWidth = 3 * alpha;
          this.ctx.beginPath();
          this.ctx.moveTo(prev.x, prev.y);
          this.ctx.lineTo(curr.x, curr.y);
          this.ctx.stroke();
        }
      }

      // Draw shooting star head
      const headOpacity = shootingStar.life / shootingStar.maxLife;

      // Glow effect with color
      const glowGradient = this.ctx.createRadialGradient(
        shootingStar.x,
        shootingStar.y,
        0,
        shootingStar.x,
        shootingStar.y,
        10
      );
      glowGradient.addColorStop(0, `hsla(${shootingStar.hue}, 80%, 80%, ${headOpacity})`);
      glowGradient.addColorStop(1, `hsla(${shootingStar.hue}, 80%, 80%, 0)`);

      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(shootingStar.x, shootingStar.y, 10, 0, Math.PI * 2);
      this.ctx.fill();

      // Bright core with color
      this.ctx.fillStyle = `hsla(${shootingStar.hue}, 90%, 85%, ${headOpacity})`;
      this.ctx.beginPath();
      this.ctx.arc(shootingStar.x, shootingStar.y, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  private animate(): void {
    this.time += 0.01;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Background is now transparent - drawBackground() call removed
    this.updateStars();
    this.updateShootingStars();
    this.drawStars();
    this.drawShootingStars();

    // Randomly create shooting stars
    if (Math.random() < 0.003) {
      this.createShootingStar();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public start(): void {
    if (!this.animationId) {
      this.animate();
    }
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.resize);
  }
}

let visualization: StarryNightVisualization | null = null;

export function initArt(): StarryNightVisualization | null {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;

  if (!canvas) {
    console.error('Canvas element not found');
    return null;
  }

  // Clean up existing visualization if any
  if (visualization) {
    visualization.destroy();
  }

  visualization = new StarryNightVisualization(canvas);
  visualization.start();

  return visualization;
}
