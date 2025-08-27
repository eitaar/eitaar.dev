import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { loadLinksPreset } from '@tsparticles/preset-links';

let isInitialized = false;

function isSmartphone(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
}
async function initializeParticles() {
  if (isInitialized) return;
  try {
    await initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadLinksPreset(engine);
    });
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize particles engine:', error);
  }
}

export default function App() {
  const options: ISourceOptions = {
    preset: 'links',
    particles: {
      number: {
        value: isSmartphone() ? 30 : 100,
        density: {
          enable: false,
        },
      },
    },
    background: {
      color: {
        value: 'transparent',
      },
    },
    fullScreen: {
      enable: true,
      zIndex: -100,
    },
  };

  const particlesLoaded = async (container?: Container): Promise<void> => {
    if (container) {
      console.log('Particles loaded:', container);
    }
  };

  // Initialize particles when component renders
  initializeParticles();

  return (
    <div className="bg-wrapper">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className=""
      />
    </div>
  );
}
