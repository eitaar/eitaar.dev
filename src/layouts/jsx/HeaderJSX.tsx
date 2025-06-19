import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import { gsap } from "gsap";
import { useState, useEffect } from "react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin);

export default function App(props:any) {
  const [isRainVisible, setIsRainVisible] = useState(true);

  useEffect(() => {
    // Get initial rain state from localStorage
    const savedRainState = localStorage.getItem("rain-visible");
    if (savedRainState !== null) {
      setIsRainVisible(savedRainState === "true");
    }
  }, []);
  useEffect(() => {
    // Create or remove rain container based on state
    const existingRainContainer = document.querySelector('.rain-container');
    
    if (isRainVisible && !existingRainContainer) {
      // Create rain container if it doesn't exist
      createRainContainer();
    } else if (!isRainVisible && existingRainContainer) {
      // Remove rain container if it exists
      existingRainContainer.remove();
    }
    
    // Save state to localStorage
    localStorage.setItem("rain-visible", isRainVisible.toString());
  }, [isRainVisible]);

  const createRainContainer = () => {
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-container';
    
    // Create 30 rain lines
    for (let i = 1; i <= 30; i++) {
      const rainLine = document.createElement('div');
      rainLine.className = 'rain-line';
      rainContainer.appendChild(rainLine);
    }
    
    // Insert at the beginning of body
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
      <NavbarContent justify="end">        <NavbarItem>
          <Button
            color="secondary"
            variant="flat"
            isIconOnly={true}
            aria-label="Toggle rain"
            onPress={toggleRain}
            >
            {isRainVisible ? props.rainToggleOn : props.rainToggleOff}
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
