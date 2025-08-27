import { useEffect, useState } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export default function PageNotFound() {
  const [init, setInit] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Initialize particles engine once when component mounts
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  const handleEnjoyNyan = () => {
    setShowOverlay(false);
  };

  if (!init) {
    return <></>;
  }

  return (
    <div className="relative h-screen w-full">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        url="/particles.json"
        className="absolute inset-0 z-0"
      />

      <div
        className={`relative flex h-screen w-full flex-col items-center justify-center bg-gray-700/50 text-center backdrop-blur-xs transition-opacity duration-500 ${
          showOverlay ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="z-10 space-y-6">
          <h1 className="font-Quantico text-8xl font-bold text-white drop-shadow-2xl">404</h1>
          <h2 className="font-Quantico text-3xl text-white drop-shadow-lg">Nyant Found</h2>
          <p className="mx-auto text-lg text-gray-200 drop-shadow-md">
            Oops! The page you were looking for could not be found.
            <br />
            It seems like we're wandering through space with Nyan Cat.
          </p>
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
            <Button onPress={handleReturnHome} color="primary" variant="shadow">
              Return To Top
            </Button>
            <Button onPress={handleEnjoyNyan} color="secondary" variant="flat">
              Enjoy Nyan Cat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
