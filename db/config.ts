import { column, defineDb, defineTable, NOW } from "astro:db";

export const snippet = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const category = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
  },
});

export const snippetCategory = defineTable({
  columns: {
    categoryId: column.text({ references: () => category.columns.id }),
    snippetId: column.text({ references: () => snippet.columns.id }),
  },
});

export const fragment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    code: column.text(),
    language: column.text(),
    position: column.number(),
    snippetId: column.text({ references: () => snippet.columns.id }),
  },
});

export default defineDb({
  tables: { category, fragment, snippet, snippetCategory },
});
