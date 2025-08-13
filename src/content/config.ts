// src/content/config.ts
import { z, defineCollection } from 'astro:content';
import { date } from 'astro:schema';

const articleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()),
    emoji: z.string(),
  }),
});

const modelCollection = defineCollection({
  type: 'content',
  schema: z.object({
    filename: z.string(),
    date: date(),
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  articles: articleCollection,
  models: modelCollection,
};
