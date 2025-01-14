type LanguageInfo = {
  extension: string;
  label: string;
  color: string;
  aliases?: string[];
};

const languages: Record<string, LanguageInfo> = {
  css: {
    extension: "css",
    label: "CSS",
    color: "var(--sl-color-blue)",
    aliases: ["css3", "styles", "stylesheet", "scss", "sass", "less", "postcss", "style"],
  },
  html: {
    extension: "html",
    label: "HTML",
    color: "#e34c26",
    aliases: ["html5", "htm", "xhtml", "markup"],
  },
  js: {
    extension: "js",
    label: "Javascript",
    color: "#f7df1e",
    aliases: ["javascript", "jsx", "nodejs", "mjs", "cjs", "tsx", "tsc"],
  },
  python: {
    extension: "py",
    label: "Python",
    color: "#ffde57",
    aliases: ["py"],
  },
  shell: {
    extension: "sh",
    label: "Shell",
    color: "var(--sl-color-green)",
    aliases: ["bash", "regex", "script", "sh", "terminal", "zsh"],
  },
  text: {
    extension: "txt",
    label: "Text",
    color: "#111111",
    aliases: ["txt", "plaintext", "log", "raw"],
  },
  typescript: {
    extension: "ts",
    label: "Typescript",
    color: "var(--sl-color-blue-high)",
    aliases: ["ts", "tsx", "typescriptreact"],
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
