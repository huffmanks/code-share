import { LanguageIcon } from "@/components/preact-icons";
import styles from "@/components/snippet-card.module.css";
import type { SnippetWithHtml } from "@/components/snippet-grid";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { getLanguageInfo } from "@/lib/languages";

interface SnippetCardProps {
  snippet: SnippetWithHtml;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const languageInfo = getLanguageInfo(snippet.data.language);
  const variants = ["note", "danger", "success", "caution", "tip"] as const;

  const time = formatRelativeTime(snippet.data.createdAt);

  const LanguageIconComponent = LanguageIcon[languageInfo.extension];

  return (
    <article className={styles.card}>
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
        <h2 className={styles.title}>{snippet.data.title}</h2>
        <div class={`${styles.language} sl-flex`}>
          {LanguageIconComponent && <LanguageIconComponent style={{ color: languageInfo.color }} />}
          <span>{languageInfo.label}</span>
        </div>
        <div class={`${styles.description} truncate`}>
          <p>{snippet.data.description}</p>
        </div>
        <div className={styles.tagsContainer}>
          {snippet.data.tags && snippet.data.tags.map((tag: string, index: number) => <div className={`${styles.badge} ${styles[`badge-${variants[index % variants.length]}`]}`}>{tag}</div>)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: snippet.codeHtml }} />
      </div>
    </article>
  );
}
