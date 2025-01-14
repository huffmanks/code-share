type LanguageInfo = {
  extension: string;
  label: string;
  color: string;
  aliases: string[];
  mimeType: string;
};

const languages: Record<string, LanguageInfo> = {
  css: {
    extension: "css",
    label: "CSS",
    color: "#663399",
    aliases: ["css", "css3", "styles", "stylesheet", "scss", "sass", "less", "postcss", "style"],
    mimeType: "text/css",
  },
  html: {
    extension: "html",
    label: "HTML",
    color: "#e34f26",
    aliases: ["html", "html5", "htm", "xhtml", "markup"],
    mimeType: "text/html",
  },
  js: {
    extension: "js",
    label: "Javascript",
    color: "#f7df1e",
    aliases: ["javascript", "js", "jsx", "nodejs", "mjs", "cjs", "tsx", "tsc"],
    mimeType: "application/javascript",
  },
  json: {
    extension: "json",
    label: "JSON",
    color: "#e3dcdc",
    aliases: ["json", "jsonc", "json-ld", "tsconfig", "package.json"],
    mimeType: "application/json",
  },
  markdown: {
    extension: "md",
    label: "Markdown",
    color: "#e3dcdc",
    aliases: ["md", "mdx", "markdown", "mdown"],
    mimeType: "text/markdown",
  },
  python: {
    extension: "py",
    label: "Python",
    color: "#ffde57",
    aliases: ["py", "python"],
    mimeType: "text/x-python",
  },
  shell: {
    extension: "sh",
    label: "Shell",
    color: "var(--sl-color-green)",
    aliases: ["bash", "regex", "script", "sh", "terminal", "zsh"],
    mimeType: "application/x-sh",
  },
  text: {
    extension: "txt",
    label: "Text",
    color: "#e95420",
    aliases: ["txt", "plaintext", "log", "raw"],
    mimeType: "text/plain",
  },
  typescript: {
    extension: "ts",
    label: "Typescript",
    color: "#3178c6",
    aliases: ["ts", "tsx", "typescriptreact"],
    mimeType: "application/typescript",
  },
  xml: {
    extension: "xml",
    label: "XML",
    color: "#e3dcdc",
    aliases: ["xml", "rss", "svg", "plist"],
    mimeType: "application/xml",
  },
  yaml: {
    extension: "yaml",
    label: "YAML",
    color: "#cB171e",
    aliases: ["yaml", "yml"],
    mimeType: "application/x-yaml",
  },
};

export const languageMap: Record<string, LanguageInfo> = (() => {
  const map: Record<string, LanguageInfo> = {};

  for (const [key, info] of Object.entries(languages)) {
    map[key.toLowerCase()] = info;

    info.aliases?.forEach((alias) => {
      map[alias.toLowerCase()] = info;
    });
  }

  return map;
})();

export const languageMapLength = Object.keys(languageMap).length;

export function getLanguagesInfo(fragments: Array<{ language: string }>): LanguageInfo[] {
  const uniqueLanguages = [...new Set(fragments.map((fragment) => fragment.language.toLowerCase()))];

  return uniqueLanguages.map((language) => languageMap[language]);
}

export function getAllLanguagesLabels(): string[] {
  return Object.values(languages).map((language) => language.label);
}

export function getAllLanguagesWithExtensionsAndLabels(): { extension: string; label: string }[] {
  return Object.values(languages).map((language) => ({
    extension: language.extension,
    label: language.label,
  }));
}
