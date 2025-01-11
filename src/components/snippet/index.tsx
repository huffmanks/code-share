import type { Snippet } from "@/content.config";

import { ButtonIcon } from "@/components/preact-icons";
import SnippetGrid from "@/components/snippet/grid";
import styles from "@/components/snippet/index.module.css";
import SnippetList from "@/components/snippet/list";
import SnippetTable from "@/components/snippet/table";
import { getAllLanguagesWithExtensionsAndLabels } from "@/lib/languages";
import { useState } from "preact/hooks";
import { type JSX } from "preact/jsx-runtime";

export type SnippetWithHtml = Snippet & {
  codeHtml: string;
};

interface SnippetContainerProps {
  snippets: SnippetWithHtml[];
}

type SortField = "title" | "createdAt";
type SortDirection = "asc" | "desc";

interface SortState {
  field: SortField;
  direction: SortDirection;
}

export default function SnippetContainer({ snippets }: SnippetContainerProps) {
  const [sortState, setSortState] = useState<SortState>({
    field: "title",
    direction: "asc",
  });
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [toggleView, setToggleView] = useState("grid");

  const languageOptions = getAllLanguagesWithExtensionsAndLabels();

  const filteredSnippets = snippets.filter((snippet) => (selectedLanguage ? snippet.data.language === selectedLanguage : true));

  const sortedSnippets = [...filteredSnippets].sort((a, b) => {
    const { field, direction } = sortState;
    const aValue = field === "title" ? a.data.title.toLowerCase() : new Date(a.data.createdAt).getTime();
    const bValue = field === "title" ? b.data.title.toLowerCase() : new Date(b.data.createdAt).getTime();

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  function handleChangeLanguage(e: JSX.TargetedEvent<HTMLSelectElement, Event>) {
    const target = e.target as HTMLSelectElement;
    setSelectedLanguage(target.value);
  }

  function toggleSort(field: SortField) {
    setSortState((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  function handleToggleView(value: string) {
    setToggleView(value);
  }

  return (
    <>
      <div className={styles.toolbar}>
        <div>
          <label className="sr-only" htmlFor="language-filter">
            Language filter select
          </label>
          <select name="language-filter" id="language-filter" value={selectedLanguage} onChange={handleChangeLanguage}>
            <option value="">All languages</option>
            {languageOptions.map((option) => (
              <option key={option.extension} value={option.extension}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.sortViewGroup}>
          <div role="group" aria-label="Sort snippet group">
            <button
              className={styles.btn}
              style={{
                borderRight: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: sortState.field === "title" ? "rgb(39, 39, 42)" : "",
                color: sortState.field === "title" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => toggleSort("title")}>
              {sortState.field !== "title" ? <ButtonIcon.az /> : sortState.direction === "asc" ? <ButtonIcon.azdown /> : <ButtonIcon.azup />}
            </button>
            <button
              className={styles.btn}
              style={{
                borderLeft: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: sortState.field === "createdAt" ? "rgb(39, 39, 42)" : "",
                color: sortState.field === "createdAt" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => toggleSort("createdAt")}>
              {sortState.field !== "createdAt" ? <ButtonIcon.cal /> : sortState.direction === "asc" ? <ButtonIcon.caldown /> : <ButtonIcon.calup />}
            </button>
          </div>

          <div role="group" aria-label="View toggle group">
            <button
              className={styles.btn}
              style={{
                borderRight: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: toggleView === "grid" ? "rgb(39, 39, 42)" : "",
                color: toggleView === "grid" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => handleToggleView("grid")}>
              <ButtonIcon.grid />
            </button>
            <button
              className={styles.btn}
              style={{
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                backgroundColor: toggleView === "list" ? "rgb(39, 39, 42)" : "",
                color: toggleView === "list" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => handleToggleView("list")}>
              <ButtonIcon.list />
            </button>
            <button
              className={styles.btn}
              style={{
                borderLeft: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: toggleView === "table" ? "rgb(39, 39, 42)" : "",
                color: toggleView === "table" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => handleToggleView("table")}>
              <ButtonIcon.table />
            </button>
          </div>
        </div>
      </div>

      <div>
        {toggleView === "list" ? (
          <>
            <SnippetList snippets={sortedSnippets} />
          </>
        ) : toggleView === "table" ? (
          <>
            <SnippetTable snippets={sortedSnippets} />
          </>
        ) : (
          <>
            <SnippetGrid snippets={sortedSnippets} />
          </>
        )}
      </div>
    </>
  );
}
