import type { CollectionEntry } from "astro:content";

export type Snippet = CollectionEntry<"snippets">;
export type Cheatsheet = CollectionEntry<"cheatsheets">;

export type Fragment = {
  filename: string;
  label: string;
  language: string;
  position: number;
  code: string;
};

export type FragmentWithCodeHtml = Fragment & {
  codeHtml: string;
};

export type SnippetWithHtml = Snippet & {
  codeFragments: FragmentWithCodeHtml[];
};

export type ParamKeys = "language" | "field" | "direction" | "view";
export type SelectedLanguage = string;
export type ToggleView = "grid" | "list" | "table";
export type SortField = "title" | "updatedAt";
export type SortDirection = "asc" | "desc";

export type LanguageInfo = {
  extension: string;
  label: string;
  color: string;
  aliases: string[];
  mimeType: string;
};

export type SettingsForm = {
  username: string;
  serverIpAddress: string;
  clientIpAddress: string;
  dockerPath: string;
  externalHddPath: string;
  externalHddUuid: string;
  nfsSharePath: string;
  nfsMountPath: string;
};
