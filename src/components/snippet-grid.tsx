import type { Snippet } from "@/content.config";

import { SortIcon } from "@/components/preact-icons";
import SnippetCard from "@/components/snippet-card";
import styles from "@/components/snippet-grid.module.css";
import { useState } from "preact/hooks";

export type SnippetWithHtml = Snippet & {
  codeHtml: string;
};

interface SnippetGridProps {
  snippets: SnippetWithHtml[];
}

type SortField = "title" | "createdAt";
type SortDirection = "asc" | "desc";

interface SortState {
  field: SortField;
  direction: SortDirection;
}

export default function SnippetGrid({ snippets }: SnippetGridProps) {
  const [sortState, setSortState] = useState<SortState>({
    field: "title",
    direction: "asc",
  });

  const sortedSnippets = [...snippets].sort((a, b) => {
    const { field, direction } = sortState;
    const aValue = field === "title" ? a.data.title.toLowerCase() : new Date(a.data.createdAt).getTime();
    const bValue = field === "title" ? b.data.title.toLowerCase() : new Date(b.data.createdAt).getTime();

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  function toggleSort(field: SortField) {
    setSortState((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  return (
    <>
      <div className={styles.sortGroup}>
        <button className={styles.btn} onClick={() => toggleSort("title")}>
          {sortState.field !== "title" ? <SortIcon.az /> : sortState.direction === "asc" ? <SortIcon.azdown /> : <SortIcon.azup />}
        </button>
        <button className={styles.btn} onClick={() => toggleSort("createdAt")}>
          {sortState.field !== "createdAt" ? <SortIcon.cal /> : sortState.direction === "asc" ? <SortIcon.caldown /> : <SortIcon.calup />}
        </button>
      </div>

      <div className={styles.grid}>
        {sortedSnippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </>
  );
}
