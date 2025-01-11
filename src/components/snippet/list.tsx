import type { SnippetWithHtml } from "@/components/snippet";

export default function SnippetList({ snippets }: { snippets: SnippetWithHtml[] }) {
  return (
    <>
      <div>
        {snippets.map((snippet) => (
          <div key={snippet.id}>{snippet.data.title}</div>
        ))}
      </div>
    </>
  );
}
