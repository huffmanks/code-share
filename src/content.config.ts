import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

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
  cheatsheets: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/cheatsheets" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      updatedAt: z.coerce.string(),
      groups: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          items: z.array(
            z.object({
              label: z.string(),
              description: z.string(),
              code: z.string().optional(),
              codeLang: z.string().default("sh"),
              comment: z.string().optional(),
              example: z.string().optional(),
              commands: z
                .array(
                  z.object({
                    steps: z.array(
                      z.object({
                        key: z.string(),
                      })
                    ),
                    isAlternative: z.boolean().default(false),
                  })
                )
                .optional(),
            })
          ),
        })
      ),
    }),
  }),
};
