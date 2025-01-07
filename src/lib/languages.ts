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
  },
  html: {
    extension: "html",
    label: "HTML",
    color: "#e34c26",
  },
  python: {
    extension: "py",
    label: "Python",
    color: "#ffde57",
    aliases: ["py"],
  },
  regex: {
    extension: "regex",
    label: "Regex",
    color: "var(--sl-color-purple)",
  },
  sh: {
    extension: "sh",
    label: "Shell",
    color: "var(--sl-color-green)",
    aliases: ["bash", "shell", "terminal", "zsh"],
  },
  ts: {
    extension: "ts",
    label: "Typescript",
    color: "var(--sl-color-blue-high)",
    aliases: ["typescript", "tsx"],
  },
  txt: {
    extension: "txt",
    label: "Text",
    color: "#111111",
    aliases: ["text"],
  },
};

export const languageMap: Record<string, LanguageInfo> = (() => {
  const map: Record<string, LanguageInfo> = {};

  for (const [key, info] of Object.entries(languages)) {
    map[key] = info;

    info.aliases?.forEach((alias) => {
      map[alias] = info;
    });
  }

  return map;
})();

export const languageMapLength = Object.keys(languageMap).length;

export function getLanguageInfo(language: string): LanguageInfo {
  const normalizedLanguage = language.toLowerCase();
  return languageMap[normalizedLanguage];
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
