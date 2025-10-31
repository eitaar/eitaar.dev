import aitaarImg from "../assets/img/projects/aitaar.png";
import blockbenchImg from "../assets/img/projects/double-sided-sword.png";
import githubStatsImg from "../assets/img/projects/github-stats.png";
import portFolioImg from "../assets/img/projects/portfolio.png";
import wahootImg from "../assets/img/projects/wahoot.png";
import type { ProjectProps } from "../types/global";

export const Projects: ProjectProps[] = [
	{
		title: "Portfolio",
		slug: "portfolio",
		description:
			"A personal portfolio website to showcase my projects and skills, built with Astro and Tailwind CSS.",
		content:
			"This is my portfolio website. I made it because I bought a domain without having a plan for it, and I wanted to use it for something because I will feel like I wasted money if I don't. It is made with  Astro and Tailwind CSS.",
		imageUrl: portFolioImg,
		projectUrl: "https://eitaar.dev",
		repoUrl: "https://github.com/eitaar/eitaar.dev",
		tags: ["Astro", "Tailwind CSS", "Web"],
	},
	{
		title: "Wahoot",
		slug: "wahoot",
		description:
			"A third party client for Kahoot! with extended features and customization options. Built with Nuxt.js",
		content:
			"This is a third-party client for playing Kahoot! game. It was my first project involving a web framework, so it's not great. I used NuxtJS as the framework and a custom-made library to interact with the Kahoot! game.  Although this project was terrible, it was fun to work on because I found several tricks to bypass the restrictions.",
		imageUrl: wahootImg,
		projectUrl: "https://wahoot.eitaar.dev",
		repoUrl: "https://github.com/eitaar/eitaar.dev",
		tags: ["Astro", "Tailwind CSS", "Web"],
	},
	{
		title: "3D models",
		slug: "3d-models",
		description:
			"Collection of 3D models created using Blockbench for Minecraft resource packs / plugins.",
		content:
			"I created several low-poly 3D models using Blockbench, which is a 3D modeling software which can be use to create Minecraft assets. These models include a double-sided sword from Neon Genesis Evangelion and other custom designs that I made for fun and practice.",
		imageUrl: blockbenchImg,
		repoUrl: "https://github.com/eitaar/EitmcResourcePack/",
		tags: ["Blockbench", "3D Modeling"],
	},
	{
		title: "Github Stats",
		slug: "github-stats",
		description: "A small REST API to fetch and display GitHub user statistics. Built with Hono",
		content:
			"This is a small REST API that I created to retrieve information from my GitHub account. I don't know if I need to remove it, because if a random crawling bot finds this API and uses it elsewhere, my GitHub API might get locked. ",
		imageUrl: githubStatsImg,
		projectUrl: "https://get-github-stats.eitaar.workers.dev/eitaar",
		tags: ["Astro", "Tailwind CSS", "Web"],
	},
	{
		title: "Aitaar",
		slug: "aitaar",
		description:
			"A hyper super duper AI (annoning ininteligence) chatbot built with Nuxt and tailwindcss.",
		content:
			"This is a random chatbot project that I made for no reason when my PC broke and I had to use replit for development. It is 99% AI-generated. Whenever you ask something, it will respond with a answer for ultimate quesion. I guess I was testing the limits of AI code generation?",
		imageUrl: aitaarImg,
		projectUrl: "https://aitaar.vercel.app",
		repoUrl: "github.com/eitaar/aitaar",
		tags: ["Nuxt", "Tailwind CSS", "Web", "AI"],
	},
];
