import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { loadLinksPreset } from '@tsparticles/preset-links';

// Initialize particles engine once at module level
let engineInitialized = false;
let initPromise: Promise<void> | null = null;

const initializeEngine = async (): Promise<void> => {
  if (engineInitialized) return;

  if (initPromise) return initPromise;

  initPromise = initParticlesEngine(async (engine) => {
    await loadSlim(engine);
    await loadLinksPreset(engine);
  }).then(() => {
    engineInitialized = true;
  });

  return initPromise;
};

export default function App() {
  // Initialize engine when component is first loaded
  initializeEngine();

  const options = {
    preset: 'links',
    background: {
      color: {
        value: 'transparent',
      },
    },
  };

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -999,
        pointerEvents: 'none',
      }}
    />
  );
}
