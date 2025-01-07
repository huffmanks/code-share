import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { defineCollection, z, type CollectionEntry } from "astro:content";

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  snippets: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/snippets" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      language: z.string(),
      tags: z.array(z.string()),
      createdAt: z.coerce.string(),
    }),
  }),
};

export type Snippet = CollectionEntry<"snippets">;
