import { ButtonIcon } from "@/components/preact-icons";
import { downloadFile } from "@/lib/downloadFile";
import type { Snippet } from "@/types";

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
