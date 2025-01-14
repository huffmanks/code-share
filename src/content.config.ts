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
      tags: z.array(z.string()),
      updatedAt: z.coerce.string(),
      fragments: z.array(
        z.object({
          filename: z.string(),
          label: z.string(),
          language: z.enum(["css", "html", "js", "py", "sh", "txt", "ts"]),
          position: z.number().default(0),
          code: z.string(),
        })
      ),
    }),
  }),
};

export type Snippet = CollectionEntry<"snippets">;
