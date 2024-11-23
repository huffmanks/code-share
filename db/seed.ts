import { createId } from "@paralleldrive/cuid2";
import { category, db, fragment, snippet, snippetCategory } from "astro:db";

const ids = {
  categories: [createId(), createId()],
  snippets: [createId(), createId()],
  fragments: [createId(), createId()],
};

export default async function () {
  await db.insert(category).values([
    { id: ids.categories[0], title: "regex" },
    { id: ids.categories[1], title: "grid" },
  ]);

  await db.insert(snippet).values([
    { id: ids.snippets[0], title: "Equal size grid columns", description: "Make equal size grid columns that auto wrap." },
    { id: ids.snippets[1], title: "Add title to link", description: "Add title attribute to all links." },
  ]);

  await db.insert(fragment).values([
    { id: ids.fragments[0], title: "Pattern", code: `(<a\b[^>]_href="([^"]+)"[^>]_)(>)([^<]+)(</a>)`, language: "bash", position: 0, snippetId: ids.snippets[1] },
    { id: ids.fragments[1], title: "Replace", code: `$1 title="$4"$3$4$5`, language: "bash", position: 0, snippetId: ids.snippets[1] },
  ]);

  await db.insert(snippetCategory).values([
    { categoryId: ids.categories[0], snippetId: ids.snippets[0] },
    { categoryId: ids.categories[1], snippetId: ids.snippets[1] },
  ]);
}
