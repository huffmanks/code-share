import type { SnippetWithHtml } from "@/components/snippet";
import styles from "@/components/snippet/table.module.css";
import { badgeVariants } from "@/lib/constants";

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
  const createdAt = new Date(snippet.data.createdAt).toLocaleString();
  return (
    <>
      <tr>
        <td className="truncate" style={{ maxWidth: 200 }}>
          {snippet.data.title}
        </td>
        <td className="truncate" style={{ maxWidth: 400 }}>
          {snippet.data.description}
        </td>
        <td>{snippet.data.language}</td>
        <td>
          {snippet.data.tags.map((tag, index) => (
            <span className={`badge badge-${badgeVariants[index % badgeVariants.length]}`}>{tag}</span>
          ))}
        </td>
        <td>{createdAt}</td>
      </tr>
    </>
  );
}
