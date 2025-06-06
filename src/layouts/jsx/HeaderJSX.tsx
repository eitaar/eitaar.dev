import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
  import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin);

export default function App(props:any) {
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
          <Button color="primary" id="theme-toggle" variant="flat" isIconOnly={true} aria-label="Toggle theme">
            {props.themeToggle}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
