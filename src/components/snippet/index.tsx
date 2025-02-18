import { ButtonIcon } from "@/components/preact-icons";
import SnippetGrid from "@/components/snippet/grid";
import SnippetList from "@/components/snippet/list";
import SnippetTable from "@/components/snippet/table";
import { getLanguagesInfo } from "@/lib/languages";
import styles from "@/styles/index.module.css";
import { type SelectedLanguage, type SnippetWithHtml, type SortDirection, type SortField, type SortState, type ToggleView } from "@/types";
import { useEffect, useState } from "preact/hooks";
import { type JSX } from "preact/jsx-runtime";

interface SnippetContainerProps {
  snippets: SnippetWithHtml[];
}

export default function SnippetContainer({ snippets }: SnippetContainerProps) {
  function getSearchParams() {
    if (typeof window === "undefined") return { language: "" as SelectedLanguage, sort: "title" as SortField, direction: "asc" as SortDirection, view: "grid" as ToggleView };

    const params = new URLSearchParams(window.location.search);
    return {
      language: (params.get("language") || "") as SelectedLanguage,
      sort: (params.get("sort") || "title") as SortField,
      direction: (params.get("direction") || "asc") as SortDirection,
      view: (params.get("view") || "grid") as ToggleView,
    };
  }

  const initialParams = getSearchParams();

  const [sortState, setSortState] = useState<SortState>({
    field: initialParams.sort as SortField,
    direction: initialParams.direction as SortDirection,
  });
  const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguage>(initialParams.language);
  const [toggleView, setToggleView] = useState<ToggleView>(initialParams.view);

  const languageOptions = getLanguagesInfo(snippets.flatMap((snippet) => snippet.data.fragments).sort((a, b) => a.language.localeCompare(b.language)));

  const filteredSnippets = snippets.filter((snippet) => (selectedLanguage ? snippet.data.fragments.some((fragment) => fragment.language === selectedLanguage) : true));

  const sortedSnippets = [...filteredSnippets].sort((a, b) => {
    const { field, direction } = sortState;
    const aValue = field === "title" ? a.data.title.toLowerCase() : new Date(a.data.updatedAt).getTime();
    const bValue = field === "title" ? b.data.title.toLowerCase() : new Date(b.data.updatedAt).getTime();

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

  function handleToggleView(value: ToggleView) {
    setToggleView(value);
  }

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedLanguage) params.set("language", selectedLanguage);
    params.set("sort", sortState.field);
    params.set("direction", sortState.direction);
    params.set("view", toggleView);

    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [selectedLanguage, sortState, toggleView]);

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
              className="btn"
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
              className="btn"
              style={{
                borderLeft: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: sortState.field === "updatedAt" ? "rgb(39, 39, 42)" : "",
                color: sortState.field === "updatedAt" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => toggleSort("updatedAt")}>
              {sortState.field !== "updatedAt" ? <ButtonIcon.cal /> : sortState.direction === "asc" ? <ButtonIcon.caldown /> : <ButtonIcon.calup />}
            </button>
          </div>

          <div role="group" aria-label="View toggle group">
            <button
              className="btn"
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
              className="btn"
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
              className="btn"
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
