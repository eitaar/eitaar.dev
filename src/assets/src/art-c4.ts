interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

interface WavePoint {
  x: number;
  y: number;
  baseY: number;
  angle: number;
  amplitude: number;
  frequency: number;
}

class FluidArtVisualizer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private wavePoints: WavePoint[] = [];
  private mouseX: number = 0;
  private mouseY: number = 0;
  private time: number = 0;
  private animationId: number = 0;
  private width: number = 0;
  private height: number = 0;
  private isRunning: boolean = false;

  private readonly PARTICLE_COUNT = 150;
  private readonly WAVE_POINTS = 80;
  private readonly COLORS = {
    primary: { h: 220, s: 80, l: 50 },
    secondary: { h: 280, s: 70, l: 60 },
    accent: { h: 320, s: 85, l: 55 },
    background: { h: 240, s: 20, l: 5 },
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = context;
    this.setupCanvas();
    this.initializeParticles();
    this.initializeWaves();
    this.setupEventListeners();
  }

  private setupCanvas(): void {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;

    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  }

  private initializeParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const colorVariant = Math.random();
    let baseColor;

    if (colorVariant < 0.4) {
      baseColor = this.COLORS.primary;
    } else if (colorVariant < 0.7) {
      baseColor = this.COLORS.secondary;
    } else {
      baseColor = this.COLORS.accent;
    }

    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: Math.random() * 300 + 100,
      maxLife: Math.random() * 300 + 100,
      size: Math.random() * 3 + 1,
      hue: baseColor.h + (Math.random() - 0.5) * 40,
      saturation: baseColor.s + (Math.random() - 0.5) * 20,
      lightness: baseColor.l + (Math.random() - 0.5) * 30,
      alpha: Math.random() * 0.8 + 0.2,
    };
  }

  private initializeWaves(): void {
    this.wavePoints = [];
    for (let i = 0; i < this.WAVE_POINTS; i++) {
      const x = (i / (this.WAVE_POINTS - 1)) * this.width;
      this.wavePoints.push({
        x,
        y: this.height * 0.7,
        baseY: this.height * 0.7,
        angle: (i / this.WAVE_POINTS) * Math.PI * 2,
        amplitude: Math.random() * 50 + 30,
        frequency: Math.random() * 0.02 + 0.01,
      });
    }
  }

  private setupEventListeners(): void {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.canvas.addEventListener('click', () => {
      this.createExplosion(this.mouseX, this.mouseY);
    });
  }

  private createExplosion(x: number, y: number): void {
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = Math.random() * 8 + 4;
      const particle = this.createParticle();

      particle.x = x;
      particle.y = y;
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed;
      particle.life = 60;
      particle.maxLife = 60;
      particle.size = Math.random() * 4 + 2;

      this.particles.push(particle);
    }
  }

  private updateParticles(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      // Mouse attraction
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        particle.vx += (dx / distance) * force * 0.3;
        particle.vy += (dy / distance) * force * 0.3;
      }

      // Flow field influence
      const noiseX = particle.x * 0.005 + this.time * 0.002;
      const noiseY = particle.y * 0.005 + this.time * 0.002;
      const angle = Math.sin(noiseX) * Math.cos(noiseY) * Math.PI * 2;

      particle.vx += Math.cos(angle) * 0.1;
      particle.vy += Math.sin(angle) * 0.1;

      // Velocity damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary wrapping
      if (particle.x < 0) particle.x = this.width;
      if (particle.x > this.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.height;
      if (particle.y > this.height) particle.y = 0;

      // Update life
      particle.life--;
      if (particle.life <= 0) {
        this.particles[i] = this.createParticle();
      }
    }
  }

  private updateWaves(): void {
    for (const point of this.wavePoints) {
      point.angle += point.frequency;
      point.y = point.baseY + Math.sin(point.angle + this.time * 0.01) * point.amplitude;

      // Mouse influence on waves
      const dx = this.mouseX - point.x;
      const dy = this.mouseY - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const influence = (200 - distance) / 200;
        point.y += Math.sin(this.time * 0.05) * influence * 30;
      }
    }
  }

  private drawBackground(): void {
    // Gradient background
    const gradient = this.ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      0,
      this.width / 2,
      this.height / 2,
      Math.max(this.width, this.height) / 2
    );

    gradient.addColorStop(
      0,
      `hsl(${this.COLORS.background.h}, ${this.COLORS.background.s}%, ${this.COLORS.background.l + 5}%)`
    );
    gradient.addColorStop(
      1,
      `hsl(${this.COLORS.background.h}, ${this.COLORS.background.s}%, ${this.COLORS.background.l}%)`
    );

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  private drawWaves(): void {
    this.ctx.save();
    this.ctx.globalAlpha = 0.3;

    // Create wave path
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height);

    for (let i = 0; i < this.wavePoints.length; i++) {
      const point = this.wavePoints[i];
      if (i === 0) {
        this.ctx.lineTo(point.x, point.y);
      } else {
        const prevPoint = this.wavePoints[i - 1];
        const cpx = (prevPoint.x + point.x) / 2;
        const cpy = (prevPoint.y + point.y) / 2;
        this.ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpx, cpy);
      }
    }

    this.ctx.lineTo(this.width, this.height);
    this.ctx.closePath();

    const waveGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    waveGradient.addColorStop(
      0,
      `hsla(${this.COLORS.primary.h}, ${this.COLORS.primary.s}%, ${this.COLORS.primary.l}%, 0.4)`
    );
    waveGradient.addColorStop(
      1,
      `hsla(${this.COLORS.primary.h}, ${this.COLORS.primary.s}%, ${this.COLORS.primary.l}%, 0.1)`
    );

    this.ctx.fillStyle = waveGradient;
    this.ctx.fill();

    this.ctx.restore();
  }

  private drawParticles(): void {
    for (const particle of this.particles) {
      const lifeRatio = particle.life / particle.maxLife;
      const alpha = particle.alpha * lifeRatio;

      this.ctx.save();
      this.ctx.globalAlpha = alpha;

      // Particle glow effect
      const gradient = this.ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 3
      );

      gradient.addColorStop(
        0,
        `hsl(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%)`
      );
      gradient.addColorStop(
        0.5,
        `hsl(${particle.hue}, ${particle.saturation}%, ${particle.lightness - 20}%)`
      );
      gradient.addColorStop(1, 'transparent');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Core particle
      this.ctx.fillStyle = `hsl(${particle.hue}, ${particle.saturation}%, ${particle.lightness + 20}%)`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  private drawConnections(): void {
    this.ctx.save();
    this.ctx.globalAlpha = 0.1;

    for (let i = 0; i < this.particles.length; i++) {
      const particleA = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const particleB = this.particles[j];
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const opacity = (100 - distance) / 100;
          this.ctx.strokeStyle = `hsla(${this.COLORS.primary.h}, ${this.COLORS.primary.s}%, ${this.COLORS.primary.l}%, ${opacity * 0.3})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(particleA.x, particleA.y);
          this.ctx.lineTo(particleB.x, particleB.y);
          this.ctx.stroke();
        }
      }
    }

    this.ctx.restore();
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawBackground();
    this.drawWaves();
    this.drawConnections();
    this.drawParticles();
  }

  private animate(): void {
    if (!this.isRunning) return;

    this.time++;
    this.updateParticles();
    this.updateWaves();
    this.render();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', () => this.resizeCanvas());
  }
}

// Main initialization function
export function initArt(): {
  start: () => void;
  stop: () => void;
  destroy: () => void;
} {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'auto';

  // Find a suitable container or append to body
  const container = document.querySelector('#art-container') || document.body;
  container.appendChild(canvas);

  const visualizer = new FluidArtVisualizer(canvas);

  // Auto-start the visualization
  visualizer.start();

  return {
    start: () => visualizer.start(),
    stop: () => visualizer.stop(),
    destroy: () => {
      visualizer.destroy();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    },
  };
}
