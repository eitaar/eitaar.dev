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
    rainContainer.className = 'rain-container';

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
        <p className="font-bold text-2xl">eitaar.dev</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">        
        <NavbarItem>
          <Link
          className="cursor-pointer"
          color="primary" 
          underline="hover"
          onPressEnd={()=>{
            const aboutElement = document.getElementById("ABOUT");
            gsap.to(window, { duration: 0.2, scrollTo: {y:'#ABOUT', 
              offsetY : aboutElement ? aboutElement.offsetHeight : 0,
            }});
          }}
          >
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
          color="primary"
          className="cursor-pointer"
          underline="hover"
          onPressEnd={()=>{
            const projectsElement = document.getElementById("PROJECTS");
            gsap.to(window, { duration: 0.2, scrollTo: {y:'#PROJECTS', 
              offsetY : projectsElement ? projectsElement.offsetHeight : 0,
            }});
          }}
          >
            Projects
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
