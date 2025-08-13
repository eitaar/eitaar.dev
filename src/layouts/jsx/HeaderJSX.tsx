import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from '@heroui/react';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface HeaderProps {
  themeToggle?: ReactNode;
  rainToggleOn?: ReactNode;
  rainToggleOff?: ReactNode;
}

interface menuItem {
  name: string;
  href: string;
}
export default function HeaderJSX({ themeToggle, rainToggleOn, rainToggleOff }: HeaderProps) {
  const [isRainVisible, setIsRainVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems: menuItem[] = [
    { name: 'Top', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'Projects', href: '/projects' },
  ];

  useEffect(() => {
    const existingRainContainer = document.querySelector('.rain-container');
    if (isRainVisible && !existingRainContainer) {
    } else if (!isRainVisible && existingRainContainer) {
      existingRainContainer.remove();
    }
  }, [isRainVisible]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('class');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('class', newTheme);
    localStorage.setItem('heroui-theme', newTheme);
  };

  return (
    <Navbar
      maxWidth="full"
      position="sticky"
      id="navbar"
      className="NAVBAR font-Quantico"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarItem className="h-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
        </NavbarItem>
        <NavbarItem>
          <NavbarBrand>
            <Link
              href="/"
              className="animated-gradient text-3xl font-bold tracking-tighter"
              underline="none"
            >
              eitaar.dev
            </Link>
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden md:flex">
        <NavbarItem>
          <Link color="primary" className="cursor-pointer" underline="hover" href="/articles">
            Articles
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="primary" className="cursor-pointer" underline="hover" href="/projects">
            Projects
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-end gap-2">
          <Button
            color="secondary"
            variant="flat"
            isIconOnly
            aria-label="Toggle rain"
            onPress={() => setIsRainVisible(!isRainVisible)}
          >
            {isRainVisible ? rainToggleOn : rainToggleOff}
          </Button>
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
      <NavbarMenu className="flex flex-col items-center">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.name} className="">
            <Link
              className="w-full text-center font-Quantico text-xl"
              color="primary"
              href={item.href}
              size="lg"
              underline="active"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
