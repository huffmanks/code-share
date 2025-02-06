import { LanguageIcon } from "@/components/preact-icons";
import styles from "@/components/snippet/list.module.css";
import type { Snippet } from "@/content.config";
import { getLanguagesInfo } from "@/lib/languages";

export default function SnippetList({ snippets }: { snippets: Snippet[] }) {
  return (
    <>
      <div>
        {snippets.map((snippet) => (
          <div key={snippet.id} className={styles.listItem}>
            <h2 className={styles.title} style={{ fontSize: "1.25rem" }}>
              <a href={`/snippets/${snippet.id}`}>{snippet.data.title}</a>
            </h2>

            <SnippetLanguageItem snippet={snippet} />
            <div className={styles.description}>
              <p>{snippet.data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SnippetLanguageItem({ snippet }: { snippet: Snippet }) {
  const languages = getLanguagesInfo(snippet.data.fragments);

  return (
    <div className={styles.languages}>
      {languages.map((languageInfo) => {
        const LanguageIconComponent = LanguageIcon[languageInfo.extension];
        return (
          <div className={styles.language}>
            {LanguageIconComponent && <LanguageIconComponent style={{ color: languageInfo.color }} />}
            <span>{languageInfo.label}</span>
          </div>
        );
      })}
    </div>
  );
}
