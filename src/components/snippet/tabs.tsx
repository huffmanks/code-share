import styles from "@/styles/tabs.module.css";
import { type Fragment, type FragmentWithCodeHtml } from "@/types";
import { useState } from "preact/hooks";

interface Props {
  fragments: Fragment[];
  codeFragments?: FragmentWithCodeHtml[];
}

export default function Tabs({ fragments, codeFragments }: Props) {
  const [activeTab, setActiveTab] = useState(fragments[0].label);

  return (
    <>
      {fragments.length > 1 && (
        <div className={styles["tabs-wrapper"]}>
          <ul role="tablist" className={styles.tabs}>
            {fragments.map((fragment) => (
              <li key={fragment.label} role="presentation" className={styles.tab}>
                <span role="tab" className={`${styles["tab-label"]} ${fragment.label === activeTab ? styles.active : ""}`} onClick={() => setActiveTab(fragment.label)}>
                  {fragment.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {codeFragments && codeFragments.length && (
        <div>{codeFragments.map((fragment, index) => (activeTab === fragment.label ? <div key={fragment.filename + index} dangerouslySetInnerHTML={{ __html: fragment.codeHtml }} /> : null))}</div>
      )}
    </>
  );
}
