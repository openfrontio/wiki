import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const wiki = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/wiki",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    section: z.string(),
    cats: z.array(z.string()).default([]),
    source: z.string().optional(),
    sourceUrl: z.string().optional(),
    stub: z.boolean().optional(),
  }),
});

export const collections = { wiki };
