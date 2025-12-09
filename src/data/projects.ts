import aiTaarImage from "../assets/img/projects/aitaar.png";
import portfolioImage from "../assets/img/projects/portfolio.png";
import wahootImage from "../assets/img/projects/wahoot.png";
import type { ProjectProps } from "../type/types";

const projects: ProjectProps[] = [
	{
		title: "Portfolio",
		description:
			"My personal portfolio website, created to showcase my projects, skills, and interests. Built with Astro and Tailwind CSS, featuring a design inspired by Nothing.",
		chips: ["Astro", "Tailwind CSS"],
		numbering: 1,
		imagePosition: "left",
		imageSrc: portfolioImage,
	},
	{
		title: "Wahoot!",
		description:
			"An unofficial third-party Kahoot! client with extra features designed to streamline and enhance the user experience. Built with Nuxt and powered by a custom Kahoot! API module.",
		chips: ["Nuxt", "Javascript"],
		numbering: 2,
		imagePosition: "right",
		imageSrc: wahootImage,
	},
	{
		title: "AItaar",
		description:
			"A hyper super duper AI (annoying ininteligence) chatbot built with Nuxt and Tailwind CSS.",
		chips: ["Nuxt", "Tailwind CSS"],
		numbering: 3,
		imagePosition: "left",
		imageSrc: aiTaarImage,
	},
];

export { projects };
