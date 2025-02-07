import { type Fragment } from "@/components/snippet";
import styles from "@/components/snippet/tabs.module.css";
import { useState } from "preact/hooks";

interface Props {
  fragments: {
    filename: string;
    label: string;
    language: string;
    position: number;
    code: string;
  }[];
  codeFragments?: Fragment[];
}

export default function Tabs({ fragments, codeFragments }: Props) {
  const [activeTab, setActiveTab] = useState(fragments[0].filename);

  return (
    <>
      <ul role="tablist" className={styles.tabs}>
        {fragments.map((fragment) => (
          <li key={fragment.filename} role="presentation" className={styles.tab}>
            <span role="tab" className={`${styles.tabLabel} ${fragment.filename === activeTab ? styles.active : ""}`} onClick={() => setActiveTab(fragment.filename)}>
              {fragment.label}
            </span>
          </li>
        ))}
      </ul>

      {codeFragments && codeFragments.length && (
        <div>{codeFragments.map((fragment, index) => (activeTab === fragment.filename ? <div key={fragment.filename + index} dangerouslySetInnerHTML={{ __html: fragment.codeHtml }} /> : null))}</div>
      )}
    </>
  );
}
