import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface HeaderProps {
  themeToggle: ReactNode;
  rainToggleOn: ReactNode;
  rainToggleOff: ReactNode;
}

export default function HeaderJSX({ themeToggle, rainToggleOn, rainToggleOff }: HeaderProps) {
  const [isRainVisible, setIsRainVisible] = useState(true);
  useEffect(() => {
    const existingRainContainer = document.querySelector('.rain-container');
    if (isRainVisible && !existingRainContainer) {
      createRainContainer();
    } else if (!isRainVisible && existingRainContainer) {
      existingRainContainer.remove();
    }
  }, [isRainVisible]);

  const createRainContainer = () => {
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-container opacity-30';
    for (let i = 1; i <= 30; i++) {
      const rainLine = document.createElement('div');
      rainLine.className = 'rain-line';
      rainContainer.appendChild(rainLine);
    }
    document.body.insertBefore(rainContainer, document.body.firstChild);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('heroui-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('class', newTheme);
    document.documentElement.setAttribute('heroui-theme', newTheme);
    localStorage.setItem('heroui-theme', newTheme);
  };

  return (
    <Navbar maxWidth="full" position="sticky" id="navbar" className="NAVBAR font-Quantico">
      <NavbarBrand>
        <Link href="/" className="animated-gradient text-2xl font-bold" underline="none">
          eitaar.dev
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link color="primary" className="cursor-pointer" underline="hover" href="/articles">
            Articles
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="secondary"
            variant="flat"
            isIconOnly
            aria-label="Toggle rain"
            onPress={() => setIsRainVisible(!isRainVisible)}
          >
            {isRainVisible ? rainToggleOn : rainToggleOff}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            variant="flat"
            isIconOnly
            aria-label="Toggle theme"
            onPress={toggleTheme}
          >
            {themeToggle}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
