import { z } from "astro/zod";
import { column, defineDb, defineTable, NOW } from "astro:db";

export const snippet = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    language: column.text({ references: () => language.columns.id }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const language = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
  },
});

export const tag = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
  },
});

export const snippetTag = defineTable({
  columns: {
    tagId: column.text({ references: () => tag.columns.id }),
    snippetId: column.text({ references: () => snippet.columns.id }),
  },
});

export const fragment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    filename: column.text(),
    code: column.text(),
    position: column.number(),
    snippetId: column.text({ references: () => snippet.columns.id }),
  },
});

export default defineDb({
  tables: { snippet, language, tag, snippetTag, fragment },
});

const SnippetTableSchema = z.object({ id: z.string(), title: z.string(), description: z.string(), language: z.string(), createdAt: z.date(), updatedAt: z.date() });
export type Snippet = z.infer<typeof SnippetTableSchema>;
