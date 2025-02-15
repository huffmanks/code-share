import styles from "@/styles/tabs.module.css";
import { type Fragment, type FragmentWithCodeHtml } from "@/types";
import { useState } from "preact/hooks";

interface Props {
  fragments: Fragment[];
  codeFragments?: FragmentWithCodeHtml[];
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
