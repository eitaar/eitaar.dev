import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import { gsap } from "gsap";
import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin);

export default function App(props:any) {
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

  const toggleRain = () => {
    setIsRainVisible(!isRainVisible);
  };
  return (
    <Navbar maxWidth="full" position="sticky" id="navbar" className="font-Quantico">
      <NavbarBrand>
        <Link
          href="/"
          className="text-2xl font-bold animated-gradient"
          underline="none"
          color="none"
        >
          eitaar.dev
        </Link>
      </NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem>
            <Link 
              color="primary"
              className="cursor-pointer"
              underline="hover"
              href="/articles"
            >
              Articles
            </Link>
          </NavbarItem>
        </NavbarContent>
      <NavbarContent justify="end">        
        <NavbarItem>
          <Button
            color="secondary"
            variant="flat"
            isIconOnly={true}
            aria-label="Toggle rain"
            onPress={toggleRain}
            >
            <div id="rain-toggle-icon">
              {isRainVisible ? props.rainToggleOn : props.rainToggleOff}
            </div>
            </Button>
        </NavbarItem>
        <NavbarItem>
          <Button 
            color="primary" 
            id="theme-toggle" 
            variant="flat" 
            isIconOnly={true} 
            aria-label="Toggle theme"
            onPress={() => {
              const currentTheme = document.documentElement.getAttribute("heroui-theme");
              const newTheme = currentTheme === "dark" ? "light" : "dark";
              document.documentElement.setAttribute("class", newTheme);
              document.documentElement.setAttribute("heroui-theme", newTheme);
              localStorage.setItem("heroui-theme", newTheme);
              console.log(`Theme changed to ${newTheme}`);
            }}
          >
            {props.themeToggle}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
