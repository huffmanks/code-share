import { createJiti } from "jiti";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { viteStaticCopy } from "vite-plugin-static-copy";
import virtual from "vite-plugin-virtual";

/** @type {import('./index.js').StarlightPageContextActionConfig} */
const defaultConfig = {
  prompt: "Read {url}. I want to ask questions about it.",
  position: "above-toc",
  layout: "spread",
  sticky: false,
  llmsTxt: false,
  actions: {
    copy: true,
    viewMarkdown: false,
    chatgpt: true,
    claude: true,
    t3chat: true,
    scrollTop: true,
  },
};

/**
 * Strip YAML frontmatter, imports, and Starlight/MDX component tags from
 * markdown content, producing clean standard Markdown.
 * @param {string} content
 * @returns {Promise<string>}
 */
async function cleanMarkdown(content) {
  let title = "";
  // #--- MODIFIED ---#
  // #--- ADDED ---#
  let description = "";
  // #--- END MODIFIED ---#
  let cleaned = content;

  // --- Extract title from frontmatter and strip it ---
  const frontMatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/;
  const fmMatch = cleaned.match(frontMatterRegex);
  if (fmMatch) {
    const titleMatch = fmMatch[1].match(/title:\s*["']?([^"'\n]+)["']?/);
    title = titleMatch ? titleMatch[1].trim() : "";

    // #--- MODIFIED ---#
    // #--- ADDED ---#
    const descMatch = fmMatch[1].match(/description:\s*["']?([^"'\n]+)["']?/);
    description = descMatch ? descMatch[1].trim() : "";
    // #--- END MODIFIED ---#

    cleaned = fmMatch[2];
  } else {
    // Fallback: strip frontmatter without extracting
    cleaned = cleaned.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  }

  // --- Helper: protect fenced code blocks during transforms ---
  // Splits content into [codeBlock, nonCode, codeBlock, nonCode, ...]
  function transformOutsideCodeBlocks(text, transformFn) {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => (i % 2 === 1 ? part : transformFn(part))).join("");
  }

  // --- Strip import statements (outside code blocks) ---
  cleaned = transformOutsideCodeBlocks(cleaned, (text) => text.replace(/^import\s+.*?;\s*\r?\n?/gm, ""));

  // #--- MODIFIED ---#
  // #--- FOR PROPER INDENTATION OF STEP COMPONENTS ---#
  // #--- ADDED ---#
  cleaned = transformOutsideCodeBlocks(cleaned, (text) => {
    function processSteps(content, depth) {
      const stepRegex = /<Steps\b[^>]*>([\s\S]*?)<\/Steps>/g;
      return content.replace(stepRegex, (_, innerContent) => {
        const processedInner = processSteps(innerContent, depth + 1);
        const indent = "    ".repeat(depth);
        return processedInner
          .split("\n")
          .map((line) => (line.trim() ? indent + line : ""))
          .join("\n");
      });
    }
    return processSteps(text, 0);
  });
  // #--- END MODIFIED ---#

  // --- Strip wrapper-only components (tags removed, children kept) ---
  const wrapperComponents = ["Steps", "CardGrid", "FileTree", "Tabs", "TabItem", "Icon"];
  for (const tag of wrapperComponents) {
    const re = new RegExp(`<\\s*\\/?\\s*${tag}\\b[^>]*>\\s*`, "g");
    cleaned = transformOutsideCodeBlocks(cleaned, (text) => text.replace(re, ""));
  }

  // --- Convert semantic components to Markdown ---

  // <LinkCard title="X" href="Y" /> (self-closing)
  cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
    text.replace(
      /<LinkCard\s+(?=[^>]*title=["']([^"']+)["'])(?=[^>]*href=["']([^"']+)["'])[^>]*\/?\s*>/g,
      (_, t, h) => `[${t}](${h})`,
    ),
  );

  // <Card title="X">content</Card>
  cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
    text.replace(
      /<Card\s+(?=[^>]*title=["']([^"']+)["'])[^>]*>([\s\S]*?)<\/\s*Card\s*>/g,
      (_, t, c) => `**${t}**\n${c.trim()}`,
    ),
  );

  // <Aside type="T" title="X">content</Aside>
  const asideDefaults = {
    note: "Note",
    tip: "Tip",
    caution: "Caution",
    danger: "Danger",
  };
  cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
    text.replace(/<Aside\b([^>]*)>([\s\S]*?)<\/\s*Aside\s*>/g, (_, attrs, c) => {
      const titleAttr = attrs.match(/title=["']([^"']+)["']/);
      const typeAttr = attrs.match(/type=["']([^"']+)["']/);
      const heading = titleAttr?.[1] || asideDefaults[typeAttr?.[1]] || asideDefaults.note;
      return `**${heading}:** ${c.trim()}`;
    }),
  );

  // <Badge text="X" /> (self-closing)
  cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
    text.replace(/<Badge\s+(?=[^>]*text=["']([^"']+)["'])[^>]*\/?\s*>/g, (_, t) => t),
  );

  // #--- MODIFIED ---#
  // #--- FOR PROPER CODE EXTRACTION TO INCLUDE VARIABLES ---#
  // #--- REMOVED --#
  // <Code code="X" lang="Y" title="Z" /> (self-closing)
  // cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
  //   text.replace(/<Code\b([^>]*)\/?\s*>/g, (_, attrs) => {
  //     const codeMatch = attrs.match(/code=["']([^"']+)["']/);
  //     if (!codeMatch) return "";
  //     const code = codeMatch[1];
  //     const langMatch = attrs.match(/lang=["']([^"']+)["']/);
  //     const titleMatch = attrs.match(/title=["']([^"']+)["']/);
  //     const lang = langMatch ? langMatch[1] : "";
  //     const titleComment = titleMatch ? `// ${titleMatch[1]}\n` : "";
  //     return `\`\`\`${lang}\n${titleComment}${code}\n\`\`\``;
  //   }),
  // );

  // #--- ADDED ---#
  const jiti = createJiti(process.cwd());
  let mdxConstants = {};

  try {
    const constantsPath = path.resolve(process.cwd(), "src/lib/mdx-constants.ts");
    mdxConstants = await jiti.import(constantsPath);
  } catch (err) {
    console.warn("Could not load mdx-constants.ts:", err);
  }

  cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
    text.replace(/([ \t]*)(<Code\b[\s\S]*?\/?>)/g, (match, indent, codeTag) => {
      const codeMatch = codeTag.match(
        /code\s*=\s*(?:["']([^"']*)["']|\{\s*`([^`]*)`\s*\}|\{\s*["']([^"']*)["']\s*\}|\{\s*([^}]+)\s*\})/,
      );
      if (!codeMatch) return match;

      let code = codeMatch[1] ?? codeMatch[2] ?? codeMatch[3] ?? codeMatch[4] ?? "";

      const trimmedCode = code.trim();
      if (mdxConstants[trimmedCode] !== undefined) {
        code = mdxConstants[trimmedCode];
      }

      code = code.replace(/^\s*\r?\n/, "").replace(/\r?\n\s*$/, "");

      const langMatch = codeTag.match(/lang\s*=\s*["']([^"']*)["']/);
      const titleMatch = codeTag.match(/title\s*=\s*["']([^"']*)["']/);
      const lang = langMatch ? langMatch[1] : "";

      const titleAttr = titleMatch ? ` title="${titleMatch[1]}"` : "";

      const indentedCode = code
        .split("\n")
        .map((line) => (line ? indent + line : ""))
        .join("\n");

      return `${indent}\`\`\`${lang}${titleAttr}\n${indentedCode}\n${indent}\`\`\``;
    }),
  );
  // #--- END MODIFIED ---#

  // <LinkButton href="Y">text</LinkButton>
  cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
    text.replace(
      /<LinkButton\s+(?=[^>]*href=["']([^"']+)["'])[^>]*>([\s\S]*?)<\/\s*LinkButton\s*>/g,
      (_, h, t) => `[${t.trim()}](${h})`,
    ),
  );

  // --- Strip comments outside code blocks ---
  cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
    text.replace(/<!--([\s\S]*?)-->/g, "").replace(/\{\/\*[\s\S]*?\*\/\}/g, ""),
  );

  // #--- MODIFIED ---#
  // #--- ADDED ---#
  // --- Expand {frontmatter.description} outside code blocks ---
  cleaned = transformOutsideCodeBlocks(cleaned, (text) => {
    let res = text.replace(/<p>\s*\{\s*frontmatter\.description\s*\}\s*<\/p>/gis, description);
    res = res.res?.replace ? res : res.replace(/\{\s*frontmatter\.description\s*\}/g, description);
    return res;
  });

  // --- Strip <br> variants outside code blocks ---
  cleaned = transformOutsideCodeBlocks(cleaned, (text) => text.replace(/<br\s*\/?>/gi, ""));

  // --- Strip empty or whitespace-only <p> tags outside code blocks ---
  cleaned = transformOutsideCodeBlocks(cleaned, (text) => text.replace(/<p>\s*<\/p>/gis, ""));
  // #--- END MODIFIED ---#

  // TODO: Consider stripping HTML tags outside code blocks, but this may remove useful formatting like bold/italic. For now, we leave them in.
  // --- Strip remaining HTML tags (outside code blocks) ---
  // cleaned = transformOutsideCodeBlocks(cleaned, (text) =>
  //   text.replace(/<[^>]+>/g, ""),
  // );

  // --- Normalize whitespace ---
  // Collapse 3+ newlines to 2 (single blank line)
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  // Fix indentation on numbered list items (strip excessive leading whitespace)
  cleaned = cleaned.replace(/^[ \t]{4,}(\d+\.)/gm, "   $1");
  // Trim
  cleaned = cleaned.trim();

  // --- Prepend title ---
  if (title) {
    cleaned = `# ${title}\n\n${cleaned}`;
  }

  return cleaned + "\n";
}

/**
 * Rename a markdown file based on its path and name, following the rules:
 * - If the file is named "index", rename it to the name of its parent folder.
 * - If the file is in a subfolder, include the subfolder in the new name.
 * - Otherwise, keep the original name.
 * @param {string} fileName
 * @param {string} fileExtension
 * @param {string} fullPath
 * @returns {string}
 */
function renameHandler(fileName, fileExtension, fullPath) {
  const normalized = fullPath.replace(/\\/g, "/");
  const relative = normalized.split("src/content/docs/")[1].replace(new RegExp(`\\.${fileExtension}$`), "");
  const segments = relative.split("/");
  if (fileName === "index") {
    if (segments.length === 1) return "index.md";
    const dirs = segments.slice(0, -2).join("/");
    const folder = segments[segments.length - 2];
    return dirs ? `${dirs}/${folder}.md` : `${folder}.md`;
  }
  const dirs = segments.slice(0, -1).join("/");

  return dirs ? `${dirs}/${fileName}.md` : `${fileName}.md`;
}

/**
 * @param {string} frontmatter
 * @param {string} key
 * @returns {string | undefined}
 */
function getFrontmatterValue(frontmatter, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = frontmatter.match(new RegExp(`^${escapedKey}:\\s*(?:["']([^"']+)["']|([^\\n#]+))`, "m"));
  const value = match?.[1] ?? match?.[2];
  return value ? value.trim() : undefined;
}

/**
 * @param {string} content
 * @returns {{ title?: string; description?: string; draft: boolean }}
 */
function getDocFrontmatter(content) {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!match) {
    return { draft: false };
  }

  const frontmatter = match[1];
  return {
    title: getFrontmatterValue(frontmatter, "title"),
    description: getFrontmatterValue(frontmatter, "description"),
    draft: /^draft:\s*true(?:\s+#.*)?$/m.test(frontmatter),
  };
}

/**
 * @param {string} value
 * @returns {string}
 */
function toTitleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * @param {string} fullPath
 * @returns {string}
 */
function toMarkdownAssetPath(fullPath) {
  const ext = path.extname(fullPath).replace(/^\./, "");
  const fileName = path.basename(fullPath, path.extname(fullPath));
  return renameHandler(fileName, ext, fullPath);
}

/**
 * @param {string} pathname
 * @param {string | undefined} site
 * @param {string | undefined} base
 * @returns {string}
 */
function toPublicUrl(pathname, site, base) {
  const normalizedPath = pathname.replace(/^\/+/, "");
  if (site) {
    const baseUrl = new URL(base ?? "/", site);
    return new URL(normalizedPath, baseUrl).toString();
  }

  const normalizedBase = (base ?? "/").replace(/\/+$/, "");
  const prefix = normalizedBase ? `${normalizedBase}/` : "/";
  return `${prefix}${normalizedPath}`.replace(/^([^/])/, "/$1");
}

/**
 * @param {string} value
 * @returns {boolean}
 */
function isExternalUrl(value) {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(value);
}

/**
 * @param {string} value
 * @returns {string}
 */
function toMarkdownPathFromSidebarValue(value) {
  const withoutHashOrQuery = value.split("#")[0].split("?")[0].trim();
  if (!withoutHashOrQuery || isExternalUrl(withoutHashOrQuery)) return "";

  const normalized = withoutHashOrQuery.replace(/^\/+|\/+$/g, "");
  if (!normalized) return "index.md";

  if (/\.mdx?$/i.test(normalized)) {
    return normalized.replace(/\.mdx?$/i, ".md");
  }

  if (normalized.endsWith("/index")) {
    return `${normalized.slice(0, -"/index".length)}.md`;
  }

  if (normalized === "index") return "index.md";
  return `${normalized}.md`;
}

/**
 * @param {any} sidebarItem
 * @returns {string | undefined}
 */
function getSidebarItemLink(sidebarItem) {
  if (!sidebarItem || typeof sidebarItem !== "object") return undefined;
  if (typeof sidebarItem.link === "string") return sidebarItem.link;
  if (typeof sidebarItem.slug === "string") return sidebarItem.slug;
  return undefined;
}

/**
 * @param {any} sidebarItem
 * @returns {any[]}
 */
function getSidebarItemChildren(sidebarItem) {
  if (!sidebarItem || typeof sidebarItem !== "object") return [];
  return Array.isArray(sidebarItem.items) ? sidebarItem.items : [];
}

/**
 * @param {any[]} sidebar
 * @returns {{ heading: string; markdownPaths: string[] }[]}
 */
function collectSidebarSections(sidebar) {
  /** @type {{ heading: string; markdownPaths: string[] }[]} */
  const sections = [];

  /**
   * @param {any[]} items
   * @param {string} currentHeading
   */
  function walk(items, currentHeading) {
    for (const item of items) {
      if (!item || typeof item !== "object") continue;

      const linkOrSlug = getSidebarItemLink(item);
      const label = typeof item.label === "string" ? item.label : "";
      const children = getSidebarItemChildren(item);
      const isLabelGroup = !linkOrSlug && label && children.length > 0;

      if (isLabelGroup) {
        sections.push({ heading: label, markdownPaths: [] });
        walk(children, label);
        continue;
      }

      const activeHeading = currentHeading || "Pages";
      let section = sections.find((entry) => entry.heading === activeHeading);
      if (!section) {
        section = { heading: activeHeading, markdownPaths: [] };
        sections.push(section);
      }

      if (typeof linkOrSlug === "string") {
        const markdownPath = toMarkdownPathFromSidebarValue(linkOrSlug);
        if (markdownPath) {
          section.markdownPaths.push(markdownPath);
        }
      }

      if (children.length > 0) {
        walk(children, activeHeading);
      }
    }
  }

  walk(sidebar, "");

  return sections.filter((section) => section.markdownPaths.length > 0);
}

/**
 * @param {string | undefined} base
 * @param {string} fileName
 * @returns {string}
 */
function getLlmsRoute(base, fileName) {
  const normalizedBase = (base ?? "/").replace(/\/+$/, "");
  if (!normalizedBase || normalizedBase === "/") return `/${fileName}`;
  return `${normalizedBase}/${fileName}`.replace(/^([^/])/, "/$1");
}

/**
 * @param {string} docsDir
 * @returns {Promise<string[]>}
 */
async function collectDocsFiles(docsDir) {
  /** @type {string[]} */
  const files = [];
  const entries = await readdir(docsDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(docsDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectDocsFiles(fullPath)));
      continue;
    }

    if (/\.mdx?$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * @param {{
 *   root: URL;
 *   outDir?: URL;
 *   site?: URL;
 *   base?: string;
 *   title?: string;
 *   sidebar?: any[];
 *   logger: { warn: (message: string) => void; info: (message: string) => void };
 * }} options
 */
function llmsTxtPlugin(options) {
  const docsDir = path.join(fileURLToPath(options.root), "src", "content", "docs");
  const outDir = options.outDir ? fileURLToPath(options.outDir) : undefined;
  const llmsRoute = getLlmsRoute(options.base, "llms.txt");
  const llmsFullRoute = getLlmsRoute(options.base, "llms-full.txt");
  let hasGenerated = false;
  let missingDocsWarningShown = false;

  /**
   * @returns {Promise<{ llmsSource: string; llmsFullSource: string; pageCount: number } | null>}
   */
  async function buildLlmsSources() {
    /** @type {string[]} */
    let docFiles;
    try {
      docFiles = await collectDocsFiles(docsDir);
    } catch {
      if (!missingDocsWarningShown) {
        options.logger.warn("Could not find docs content at src/content/docs; skipping llms.txt generation.");
        missingDocsWarningShown = true;
      }
      return null;
    }

    /** @type {{ title: string; markdownPath: string; url: string; description?: string; content: string }[]} */
    const pages = [];

    for (const docFile of docFiles) {
      const content = await readFile(docFile, "utf-8");
      const frontmatter = getDocFrontmatter(content);
      if (frontmatter.draft) continue;

      const markdownPath = toMarkdownAssetPath(docFile);
      const url = toPublicUrl(markdownPath, options.site?.toString(), options.base);
      const inferredTitle = toTitleCase(path.basename(markdownPath, ".md") || "Index");

      pages.push({
        title: frontmatter.title ?? inferredTitle,
        markdownPath,
        url,
        description: frontmatter.description,
        content: await cleanMarkdown(content),
      });
    }

    pages.sort((a, b) => a.url.localeCompare(b.url));

    const pageByMarkdownPath = new Map(pages.map((page) => [page.markdownPath, page]));
    const usedMarkdownPaths = new Set();
    /** @type {{ title: string; markdownPath: string; url: string; description?: string; content: string }[]} */
    const orderedPages = [];
    const sidebarSections = collectSidebarSections(Array.isArray(options.sidebar) ? options.sidebar : []);

    const lines = [
      `# ${options.title ?? "Documentation"}`,
      "",
      "This file lists machine-readable Markdown pages for this docs site.",
      "",
    ];

    for (const section of sidebarSections) {
      lines.push(`## ${section.heading}`);
      lines.push("");

      for (const markdownPath of section.markdownPaths) {
        const page = pageByMarkdownPath.get(markdownPath);
        if (!page || usedMarkdownPaths.has(markdownPath)) continue;
        usedMarkdownPaths.add(markdownPath);
        orderedPages.push(page);
        const description = page.description ? ` - ${page.description}` : "";
        lines.push(`- [${page.title}](${page.url})${description}`);
      }

      lines.push("");
    }

    const remainingPages = pages.filter((page) => !usedMarkdownPaths.has(page.markdownPath));

    if (remainingPages.length > 0) {
      lines.push("## Other Pages");
      lines.push("");
      for (const page of remainingPages) {
        orderedPages.push(page);
        const description = page.description ? ` - ${page.description}` : "";
        lines.push(`- [${page.title}](${page.url})${description}`);
      }
      lines.push("");
    }

    const llmsFullSource = `${orderedPages.map((page) => (page.content || "").trimEnd()).join("\n\n---\n\n")}\n`;

    return {
      llmsSource: lines.join("\n"),
      llmsFullSource,
      pageCount: pages.length,
    };
  }

  return {
    name: "starlight-page-context-action-llms-txt",
    apply: (_, env) => {
      if (env.command === "serve") return true;
      if (env.command === "build") return env.ssrBuild !== true;
      return false;
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split("?")[0] : "";
        if (url !== llmsRoute && url !== llmsFullRoute) {
          next();
          return;
        }

        const result = await buildLlmsSources();
        if (!result) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end("LLMS files could not be generated.");
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        if (url === llmsFullRoute) {
          res.end(result.llmsFullSource);
          return;
        }

        res.end(result.llmsSource);
      });
    },
    async writeBundle() {
      if (hasGenerated) return;
      if (!outDir) return;

      const result = await buildLlmsSources();
      if (!result) return;

      await writeFile(path.join(outDir, "llms.txt"), result.llmsSource, "utf-8");
      await writeFile(path.join(outDir, "llms-full.txt"), result.llmsFullSource, "utf-8");

      hasGenerated = true;
      options.logger.info(`Generated llms.txt and llms-full.txt with ${result.pageCount} entries.`);
    },
  };
}

/**
 * @param {Partial<import('./index.js').StarlightPageContextActionConfig>} [userConfig]
 * @returns {import('@astrojs/starlight/types').StarlightPlugin}
 */
export default function starlightPageContextAction(userConfig = {}) {
  const config = {
    prompt: userConfig.prompt ?? defaultConfig.prompt,
    position: userConfig.position ?? defaultConfig.position,
    layout: userConfig.layout ?? defaultConfig.layout,
    sticky: userConfig.sticky ?? defaultConfig.sticky,
    llmsTxt: userConfig.llmsTxt ?? defaultConfig.llmsTxt,
    actions: {
      ...defaultConfig.actions,
      ...userConfig.actions,
    },
  };

  return {
    name: "starlight-page-context-action",
    hooks: {
      "config:setup"({ updateConfig, addIntegration, config: starlightConfig, logger }) {
        const anyActionEnabled = Object.values(config.actions).some(Boolean);
        if (!anyActionEnabled) {
          logger.warn("All page actions are disabled. The plugin will not render any UI.");
        }

        addIntegration({
          name: "starlight-page-context-action-integration",
          hooks: {
            "astro:config:setup"({ updateConfig: updateAstroConfig, config: astroConfig }) {
              const shouldGenerateMarkdown = config.actions.copy || config.actions.viewMarkdown || config.llmsTxt;

              updateAstroConfig({
                vite: {
                  plugins: [
                    virtual({
                      "virtual:starlight-page-context-action-config": `export default ${JSON.stringify(config)}`,
                    }),
                    ...(shouldGenerateMarkdown
                      ? [
                          viteStaticCopy({
                            targets: [
                              {
                                src: "src/content/docs/**/*.{md,mdx}",
                                dest: "",
                                transform: {
                                  encoding: "utf-8",
                                  handler: async (content) => await cleanMarkdown(content),
                                },
                                rename: renameHandler,
                              },
                            ],
                          }),
                        ]
                      : []),
                    ...(config.llmsTxt
                      ? [
                          llmsTxtPlugin({
                            root: astroConfig.root,
                            outDir: astroConfig.outDir,
                            site: astroConfig.site,
                            base: astroConfig.base,
                            title: starlightConfig.title,
                            sidebar: starlightConfig.sidebar,
                            logger,
                          }),
                        ]
                      : []),
                  ],
                },
              });
            },
          },
        });

        updateConfig({
          components: {
            ...starlightConfig.components,
            PageSidebar:
              starlightConfig.components?.PageSidebar ?? "starlight-page-context-action/overrides/PageSidebar.astro",
            MobileTableOfContents:
              starlightConfig.components?.MobileTableOfContents ??
              "starlight-page-context-action/overrides/MobileTableOfContents.astro",
          },
        });
      },
    },
  };
}
