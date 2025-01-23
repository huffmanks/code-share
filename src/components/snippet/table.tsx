import type { SnippetWithHtml } from "@/components/snippet";
import styles from "@/components/snippet/table.module.css";
import { borderColorVariants, colorVariants } from "@/lib/constants";
import { getVariant } from "@/lib/utils";

export default function SnippetTable({ snippets }: { snippets: SnippetWithHtml[] }) {
  return (
    <table className={styles.table}>
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
  return (
    <>
      <tr>
        <td className="truncate" style={{ maxWidth: 200 }}>
          {snippet.data.title}
        </td>
        <td className="truncate" style={{ maxWidth: 400 }}>
          {snippet.data.description}
        </td>
        <td>{snippet.data.fragments.map((fragment) => fragment.language).join(", ")}</td>
        <td>
          {snippet.data.tags.map((tag, index) => (
            <span className="badge" style={{ border: `1px solid ${getVariant(borderColorVariants, index)}`, color: getVariant(colorVariants, index) }}>
              {tag}
            </span>
          ))}
        </td>
        <td>{updatedAt}</td>
      </tr>
    </>
  );
}
