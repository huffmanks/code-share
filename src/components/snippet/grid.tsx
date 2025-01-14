import { ButtonIcon, LanguageIcon } from "@/components/preact-icons";
import type { SnippetWithHtml } from "@/components/snippet";
import styles from "@/components/snippet/grid.module.css";
import { badgeVariants } from "@/lib/constants";
import { downloadFile } from "@/lib/downloadFile";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { getLanguagesInfo } from "@/lib/languages";

export default function SnippetGrid({ snippets }: { snippets: SnippetWithHtml[] }) {
  return (
    <div className={styles.grid}>
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}

function SnippetCard({ snippet }: { snippet: SnippetWithHtml }) {
  const languages = getLanguagesInfo(snippet.data.fragments);

  const time = formatRelativeTime(snippet.data.updatedAt);

  function handleCopy() {
    console.log("nothing");
  }

  function handleDownload() {
    snippet.data.fragments.map((fragment) => {
      downloadFile(fragment);
    });
  }

  function handleNewTab() {
    console.log("nothing");
  }

  return (
    <article className={styles.card} data-pagefind-id={snippet.id}>
      <div className={styles.time}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </g>
        </svg>
        <span>{time}</span>
      </div>
      <div className={styles.cardInner}>
        <h2 id={snippet.id} className={styles.title}>
          {snippet.data.title}
        </h2>
        <div className={styles.languages}>
          {languages.map((languageInfo) => {
            const LanguageIconComponent = LanguageIcon[languageInfo.extension];
            return (
              <div class={styles.language}>
                {LanguageIconComponent && <LanguageIconComponent style={{ color: languageInfo.color }} />}
                <span data-pagefind-filter="language">{languageInfo.label}</span>
              </div>
            );
          })}
        </div>
        <div class={styles.description}>
          <p class="truncate">{snippet.data.description}</p>
        </div>
        <div className={styles.tagsContainer}>
          {snippet.data.tags &&
            snippet.data.tags.map((tag: string, index: number) => (
              <div className={`badge badge-${badgeVariants[index % badgeVariants.length]}`} data-pagefind-filter="tag">
                {tag}
              </div>
            ))}
        </div>
        <div className={styles.actionButtons}>
          <button className="btn" style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} onClick={handleCopy}>
            <ButtonIcon.copy />
          </button>
          <button className="btn" style={{ borderRadius: 0 }} onClick={handleDownload}>
            <ButtonIcon.download />
          </button>
          <button className="btn" style={{ borderLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} onClick={handleNewTab}>
            <ButtonIcon.external />
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: snippet.codeHtml }} />
      </div>
    </article>
  );
}
