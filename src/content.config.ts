import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			chips: z.array(z.string()),
			lastUpdated: z.date(),
			url: z.string().url().optional(),
			githubUrl: z.string().url().optional(),
			imageSrc: image(),
			topProject: z.boolean().optional(),
		}),
});

export const collections = {
	projects: projectCollection,
};
