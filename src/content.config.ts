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
          language: z.enum([
            "astro",
            "bashrc",
            "conf",
            "config",
            "cpp",
            "css",
            "env",
            "go",
            "html",
            "java",
            "js",
            "json",
            "jsx",
            "md",
            "mdx",
            "php",
            "py",
            "rb",
            "rs",
            "sh",
            "sql",
            "svelte",
            "toml",
            "ts",
            "tsx",
            "txt",
            "vue",
            "xml",
            "yaml",
            "yml",
          ]),
          position: z.number().default(0),
          code: z.string(),
        }),
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
          syntax: z.string().optional(),
          items: z
            .array(
              z.object({
                label: z.string(),
                description: z.string().optional(),
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
                        }),
                      ),
                      isAlternative: z.boolean().default(false),
                    }),
                  )
                  .optional(),
              }),
            )
            .optional(),
        }),
      ),
    }),
  }),
};
