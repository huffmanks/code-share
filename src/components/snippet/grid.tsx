import { ButtonIcon, LanguageIcon } from "@/components/preact-icons";
import type { SnippetWithHtml } from "@/components/snippet";
import styles from "@/components/snippet/grid.module.css";
import { borderColorVariants, colorVariants } from "@/lib/constants";
import { downloadFile } from "@/lib/downloadFile";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { getLanguagesInfo } from "@/lib/languages";
import { getVariant } from "@/lib/utils";

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

  function handleDownload() {
    snippet.data.fragments.map((fragment) => {
      downloadFile(fragment);
    });
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
              <div className={styles.language}>
                {LanguageIconComponent && <LanguageIconComponent style={{ color: languageInfo.color }} />}
                <span data-pagefind-filter="language">{languageInfo.label}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.description}>
          <p className="truncate">{snippet.data.description}</p>
        </div>
        <div className={styles.tagsContainer}>
          {snippet.data.tags &&
            snippet.data.tags.map((tag: string, index: number) => (
              <div className="badge" style={{ border: `1px solid ${getVariant(borderColorVariants, index)}`, color: getVariant(colorVariants, index) }} data-pagefind-filter="tag">
                {tag}
              </div>
            ))}
        </div>
        <div className={styles.actionButtons}>
          <button className="btn" style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} onClick={handleDownload}>
            <ButtonIcon.download />
          </button>
          <a href={`/snippets/${snippet.id}`} className="btn" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            <ButtonIcon.external />
          </a>
        </div>
        <div dangerouslySetInnerHTML={{ __html: snippet.codeHtml }} />
      </div>
    </article>
  );
}
