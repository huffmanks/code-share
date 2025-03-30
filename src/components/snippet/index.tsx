import { ButtonIcon } from "@/components/preact-icons";
import SnippetGrid from "@/components/snippet/grid";
import SnippetList from "@/components/snippet/list";
import SnippetTable from "@/components/snippet/table";
import { getLanguagesInfo } from "@/lib/languages";
import styles from "@/styles/index.module.css";
import { type ParamKeys, type SelectedLanguage, type SnippetWithHtml, type SortDirection, type SortField, type ToggleView } from "@/types";
import { useEffect, useState } from "preact/hooks";

interface SnippetContainerProps {
  snippets: SnippetWithHtml[];
}

export default function SnippetContainer({ snippets }: SnippetContainerProps) {
  const [query, setQuery] = useState({
    language: "",
    field: "title",
    direction: "asc",
    view: "grid",
  });
  const [formattedSnippets, setFormattedSnippets] = useState(snippets);
  const [loading, setLoading] = useState(true);

  const languageOptions = getLanguagesInfo(snippets.flatMap((snippet) => snippet.data.fragments).sort((a, b) => a.language.localeCompare(b.language)));

  function getQueryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return {
      language: (params.get("language") as SelectedLanguage) || "",
      field: (params.get("field") as SortField) || "title",
      direction: (params.get("direction") as SortDirection) || "asc",
      view: (params.get("view") as ToggleView) || "grid",
    };
  }

  function handleChange(key: ParamKeys, value: SelectedLanguage | SortField | SortDirection | ToggleView) {
    setQuery((prev) => {
      const isSameField = prev.field === value;
      const newDirection = isSameField && prev.direction === "asc" ? "desc" : "asc";

      const params = new URLSearchParams(window.location.search);
      params.set(key, value);
      params.set("direction", newDirection);

      window.history.replaceState(null, "", `?${params.toString()}`);

      return { ...prev, [key]: value, direction: newDirection };
    });
  }

  useEffect(() => {
    function updateSnippets() {
      const filteredSnippets = snippets.filter((snippet) => (query.language ? snippet.data.fragments.some((fragment) => fragment.language === query.language) : true));

      const sortedSnippets = [...filteredSnippets].sort((a, b) => {
        const { field, direction } = query;
        const aValue = field === "title" ? a.data.title.toLowerCase() : new Date(a.data.updatedAt).getTime();
        const bValue = field === "title" ? b.data.title.toLowerCase() : new Date(b.data.updatedAt).getTime();

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });

      setFormattedSnippets(sortedSnippets);
    }

    updateSnippets();
  }, [query]);

  useEffect(() => {
    setQuery(getQueryFromUrl());
    setLoading(false);
  }, []);

  return (
    <div className={loading ? "sr-only" : ""}>
      <div className={styles.toolbar}>
        <div>
          <label className="sr-only" htmlFor="language-filter">
            Language filter select
          </label>
          <select name="language-filter" id="language-filter" value={query.language} onChange={(e) => handleChange("language", (e.target as HTMLSelectElement).value)}>
            <option value="">All languages</option>
            {languageOptions.map((option) => (
              <option key={option.extension} value={option.extension}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["sort-view-group"]}>
          <div role="group" aria-label="Sort snippet group">
            <button
              className="btn"
              style={{
                borderRight: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: query.field === "title" ? "rgb(39, 39, 42)" : "",
                color: query.field === "title" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => handleChange("field", "title")}>
              {query.field !== "title" ? <ButtonIcon.az /> : query.direction === "asc" ? <ButtonIcon.azdown /> : <ButtonIcon.azup />}
            </button>
            <button
              className="btn"
              style={{
                borderLeft: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: query.field === "updatedAt" ? "rgb(39, 39, 42)" : "",
                color: query.field === "updatedAt" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => handleChange("field", "updatedAt")}>
              {query.field !== "updatedAt" ? <ButtonIcon.cal /> : query.direction === "asc" ? <ButtonIcon.caldown /> : <ButtonIcon.calup />}
            </button>
          </div>

          <div role="group" aria-label="View toggle group">
            <button
              className="btn"
              style={{
                borderRight: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: query.view === "grid" ? "rgb(39, 39, 42)" : "",
                color: query.view === "grid" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => handleChange("view", "grid")}>
              <ButtonIcon.grid />
            </button>
            <button
              className="btn"
              style={{
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                backgroundColor: query.view === "list" ? "rgb(39, 39, 42)" : "",
                color: query.view === "list" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => handleChange("view", "list")}>
              <ButtonIcon.list />
            </button>
            <button
              className="btn"
              style={{
                borderLeft: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: query.view === "table" ? "rgb(39, 39, 42)" : "",
                color: query.view === "table" ? "var(--sl-color-accent-high)" : "",
              }}
              onClick={() => handleChange("view", "table")}>
              <ButtonIcon.table />
            </button>
          </div>
        </div>
      </div>

      <div>
        {query.view === "list" ? (
          <>
            <SnippetList snippets={formattedSnippets} />
          </>
        ) : query.view === "table" ? (
          <>
            <SnippetTable snippets={formattedSnippets} />
          </>
        ) : (
          <>
            <SnippetGrid snippets={formattedSnippets} />
          </>
        )}
      </div>
    </div>
  );
}
