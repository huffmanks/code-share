import type { SnippetWithHtml } from "@/components/snippet";
import styles from "@/components/snippet/table.module.css";
import { borderColorVariants, colorVariants } from "@/lib/constants";
import { getVariant } from "@/lib/utils";
import { navigate } from "astro:transitions/client";

export default function SnippetTable({ snippets }: { snippets: SnippetWithHtml[] }) {
  return (
    <table className={styles.table} style={{ display: "table" }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Language</th>
          <th>Tags</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {snippets.map((snippet) => (
          <TableRow key={snippet.id} snippet={snippet} />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ snippet }: { snippet: SnippetWithHtml }) {
  const updatedAt = new Date(snippet.data.updatedAt).toLocaleString();
  const languages = [...new Set(snippet.data.fragments.map((f) => f.language))].join(", ");

  return (
    <>
      <tr className="snippet-row" onClick={() => navigate(`/snippets/${snippet.id}`)}>
        <td className="truncate" style={{ maxWidth: 200 }}>
          {snippet.data.title}
        </td>
        <td className="truncate" style={{ maxWidth: 400 }}>
          {snippet.data.description}
        </td>
        <td>{languages}</td>
        <td>
          <div class={styles.badges}>
            {snippet.data.tags.slice(0, 5).map((tag, index) => (
              <span className="badge" style={{ border: `1px solid ${getVariant(borderColorVariants, index)}`, color: getVariant(colorVariants, index), overflowWrap: "normal" }}>
                {tag}
              </span>
            ))}
          </div>
        </td>
        <td>{updatedAt}</td>
      </tr>
    </>
  );
}
