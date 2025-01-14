import { languageMap } from "@/lib/languages";

type Fragment = {
  filename: string;
  label: string;
  language: string;
  position: number;
  code: string;
};

export function downloadFile(fragment: Fragment) {
  const mimeType = languageMap[fragment.language.toLowerCase()].mimeType || "text/plain";
  const blob = new Blob([fragment.code], { type: mimeType });

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;

  anchor.download = `${fragment.filename}.${fragment.language}`;

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
