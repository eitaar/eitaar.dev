import type { Project } from '../types/common';
import eitaar_dev from '../assets/img/eitaar_dev.png';
import wahoot from '../assets/img/wahoot.png';
import get_github_api from '../assets/img/get_github_api.png';
import open_iron_doors from '../assets/img/openIronDoors.webp';
import cmd_batch from '../assets/img/cmdbat.png';

const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    stack: ['Astro', 'React', 'HeroUI', 'Tailwind CSS', 'TypeScript'],
    description:
      'My personal portfolio website built with Astro, showcasing my skills and projects.',
    github: 'https://github.com/eitaar/eitaar.dev',
    page: 'https://eitaar.dev',
    image: eitaar_dev,
  },
  {
    title: 'Wahoot',
    stack: ['Nuxt', 'Vue', 'JavaScript'],
    description: 'An unofficial third-party Kahoot client built using Nuxt and custom library.',
    github: 'https://github.com/eitaar/wahoot',
    page: 'https://wahoot.eitaar.dev',
    image: wahoot,
  },
  {
    title: 'GitHub Stats API',
    stack: ['Hono', 'TypeScript'],
    description: "A simple API to fetch GitHub user's stats, built with Hono and TypeScript.",
    image: get_github_api,
    page: 'https://get-github-stats.eitaar.workers.dev/eitaar',
  },
  {
    title: 'Open Iron Doors',
    stack: ['Java'],
    description: 'A Minecraft plugin that allows players to open iron doors without redstone.',
    github: 'https://github.com/eitaar/OpenIronDoors',
    image: open_iron_doors,
  },
  {
    title: 'command prompt on batch',
    stack: ['Batch', 'Windows'],
    description: 'A reproduction of the command prompt on Windows batch files.',
    github: 'https://github.com/eitaar/cmd.bat',
    image: cmd_batch,
  },
];

export default projects;
