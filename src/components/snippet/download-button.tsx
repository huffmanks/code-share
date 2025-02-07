import { ButtonIcon } from "@/components/preact-icons";
import type { Snippet } from "@/content.config";
import { downloadFile } from "@/lib/downloadFile";

export function DownloadButton({ snippet }: { snippet: Snippet }) {
  function handleDownload() {
    snippet.data.fragments.map((fragment) => {
      downloadFile(fragment);
    });
  }

  return (
    <>
      <button className="btn" onClick={handleDownload}>
        <ButtonIcon.download />
      </button>
    </>
  );
}
