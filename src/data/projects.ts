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
		title: "Github Stats",
		slug: "github-stats",
		description: "A small REST API to fetch and display GitHub user statistics. Built with Hono",
		content:
			"This is a small REST API that I created to retrieve information from my GitHub account. I don't know if I need to remove it, because if a random crawling bot finds this API and uses it elsewhere, my GitHub API might get locked. ",
		imageUrl: githubStatsImg,
		projectUrl: "https://get-github-stats.eitaar.workers.dev/eitaar",
		tags: ["Astro", "Tailwind CSS", "Web"],
	},
];
