import type { IconName } from "@/types";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const referenceItemSchema = z.object({
  href: z.string().url(),
  label: z.string(),
  icon: z.custom<IconName>(),
});

const referenceGroupSchema = z.object({
  heading: z.string(),
  items: z.array(referenceItemSchema),
});

const referencesSchema = z.array(z.union([referenceItemSchema, referenceGroupSchema])).optional();

export type References = z.infer<typeof referencesSchema>;

const executionFields = z.object({
  code: z.string().optional(),
  codeLang: z.string().default("sh").optional(),
  example: z.string().optional(),
  commands: z.array(z.array(z.string())).optional(),
  regex: z
    .object({
      steps: z
        .array(
          z.object({
            find: z.string(),
            replace: z.string(),
          }),
        )
        .min(1),
    })
    .optional(),
  comment: z.string().optional(),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        references: referencesSchema,
      }),
    }),
  }),
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
                ...executionFields.shape,
                platforms: z
                  .array(
                    z
                      .object({
                        os: z.array(z.enum(["macos", "linux", "windows"])).min(1),
                      })
                      .merge(executionFields),
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
