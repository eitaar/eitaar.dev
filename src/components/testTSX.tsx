import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { loadLinksPreset } from '@tsparticles/preset-links';

export default function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadLinksPreset(engine);
    })
      .then(() => {
        setInit(true);
      })
      .catch((error) => {
        console.error('Failed to initialize particles engine:', error);
      });
  }, []);

  const options: ISourceOptions = {
    preset: 'links',
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
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

  if (!init) {
    return null;
  }

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
