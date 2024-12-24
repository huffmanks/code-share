import { createId } from "@paralleldrive/cuid2";
import { db, fragment, language, snippet, snippetTag, tag } from "astro:db";
import { languageMap, languageMapLength } from "../src/lib/languages";

function generateIds(count: number): string[] {
  return Array.from({ length: count }, () => createId());
}

const ids = {
  snippets: generateIds(2),
  languages: generateIds(languageMapLength),
  tags: generateIds(2),
  fragments: generateIds(3),
};

export default async function () {
  await db.insert(tag).values([
    { id: ids.tags[0], title: "grid" },
    { id: ids.tags[1], title: "regex" },
  ]);

  const languageValues = Object.entries(languageMap).map(([key, info], index) => ({
    id: ids.languages[index],
    title: key,
    extension: info.extension,
  }));

  await db.insert(language).values(languageValues);

  await db.insert(snippet).values([
    {
      id: ids.snippets[0],
      title: "Responsive grid columns",
      description: "Make responsive grid columns that auto wrap. Make responsive grid columns that auto wrap. Make responsive grid columns that auto wrap.",
      language: ids.languages[0],
    },
    { id: ids.snippets[1], title: "Add title to link", description: "Add title attribute to all links.", language: ids.languages[1] },
  ]);

  await db.insert(fragment).values([
    {
      id: ids.fragments[0],
      filename: "responsive-grid-columns",
      code: `.el {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    gap: 20px;
}`,
      position: 0,
      snippetId: ids.snippets[0],
    },
    { id: ids.fragments[1], filename: "Pattern", code: `(<a\b[^>]_href="([^"]+)"[^>]_)(>)([^<]+)(</a>)`, position: 0, snippetId: ids.snippets[1] },
    { id: ids.fragments[2], filename: "Replace", code: `$1 title="$4"$3$4$5`, position: 1, snippetId: ids.snippets[1] },
  ]);

  await db.insert(snippetTag).values([
    { tagId: ids.tags[0], snippetId: ids.snippets[0] },
    { tagId: ids.tags[1], snippetId: ids.snippets[1] },
  ]);
}
