import type { StarlightPlugin } from "@astrojs/starlight/types";

export interface StarlightPageContextActionActions {
  /** Show "Copy page" button. @default true */
  copy?: boolean;
  /** Show "Open in ChatGPT" in the AI dropdown. @default true */
  chatgpt?: boolean;
  /** Show "Open in Claude" in the AI dropdown. @default true */
  claude?: boolean;
  /** Show "Open in T3 Chat" in the AI dropdown. @default true */
  t3chat?: boolean;
  /** Show "View as Markdown" button that opens the cleaned raw Markdown file in a new tab. @default false */
  viewMarkdown?: boolean;
  /** Show "Scroll to top" button. @default true */
  scrollTop?: boolean;
}

export interface StarlightPageContextActionConfig {
  /**
   * Prompt template for AI chat services.
   * `{url}` is replaced with the current page URL.
   * @default "Read {url}. I want to ask questions about it."
   */
  prompt?: string;
  /**
   * Position of the page actions relative to the table of contents.
   * @default "above-toc"
   */
  position?: "above-toc" | "below-toc";
  /**
   * Layout style for action buttons.
   * - `"spread"`: Buttons are spread out vertically.
   * - `"compact"`: Primary action is shown inline with a kebab menu for all actions.
   * @default "spread"
   */
  layout?: "spread" | "compact";
  /**
   * Whether the action wrapper sticks to the top of the sidebar on scroll.
   * @default false
   */
  sticky?: boolean;
  /**
   * Generate an llms.txt file at build time that lists cleaned Markdown page URLs.
   * @default false
   */
  llmsTxt?: boolean;
  /** Configure which action buttons to show. */
  actions?: StarlightPageContextActionActions;
}

export default function starlightPageContextAction(
  config?: Partial<StarlightPageContextActionConfig>,
): StarlightPlugin;
