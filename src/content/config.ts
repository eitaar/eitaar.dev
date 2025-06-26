// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const articleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()),
    emoji: z.string()
  })
});

export const collections = {
  articles: articleCollection,
};