You are an expert data migration and content structuring assistant. Your task is to refactor an existing markdown cheatsheet file to match our new Zod schema data structure, ensuring it is clean, structured, and completely DRY (Don't Repeat Yourself).

### Target Schema Reference

```ts
const executionFields = z.object({
  /**
   * The primary code command or command pattern (e.g., `uname`, `docker compose exec <service_name> <command>`).
   *
   * **Rules for LLM:**
   * - Use placeholders (like `<service_name>`) for variable arguments.
   * - Do NOT put full walkthrough examples here; use the `example` field for that.
   */
  code: z.string().optional(),
  /**
   * The programming/scripting language of the code block (defaults to "sh").
   */
  codeLang: z.string().default("sh").optional(),
  /**
   * A complete, concrete real-world usage example showing the command in action with real values.
   *
   * **Rules for LLM:**
   * - Use this ONLY when `code` alone isn't enough and a full real-world demonstration is needed. Do not duplicate what belongs in `code`.
   */
  example: z.string().optional(),
  /**
   * Structured array of command variations or sequences.
   *
   * **Rules for LLM (Handling Arrays):**
   * - **Case A (Alternatives):** Each inner array represents a standalone alternative command option (e.g., `[["n"], ["N"]]` means use `n` for forward OR `N` for backward).
   * - **Case B (Sequential Steps):** A single inner array with multiple elements represents a sequential key-combo or command pipeline that must be executed together (e.g., `[[CTRL, x, "y", ENTER]]` means press these keys in order).
   */
  commands: z.array(z.array(z.string())).optional(),
  /**
   * Used for search-and-replace text transformation steps (e.g., regex find/replace rules).
   */
  regex: z
    .object({
      steps: z
        .array(
          z.object({
            find: z.string(),
            replace: z.string(),
          }),
        )
        .min(1),
    })
    .optional(),
  /**
   * Short supplementary annotations or shorthand notes (e.g., "n=forward, N=backward" or "space=scroll, q=quit").
   */
  comment: z.string().optional(),
});

export const collections = {
  cheatsheets: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/cheatsheets" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      updatedAt: z.coerce.string(),
      /**
       * High-level parent groupings of items (e.g., for Nano: "Navigation", "Selecting Text").
       */
      groups: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          /**
           * Optional syntax breakdown or visual blueprint (e.g., a cron schedule layout diagram).
           */
          syntax: z.string().optional(),
          items: z
            .array(
              z.object({
                /**
                 * A short, platform-agnostic title for the action.
                 *
                 * **Hard Rules:**
                 * - Must be 5 words or less.
                 * - Never use concrete command code or tool names as labels (e.g., use `Service Status`, not `systemctl status`).
                 * - Must never be identical or closely similar to the description.
                 */
                label: z.string(),
                /**
                 * A clean, concise description of what the action does (ideally under 15 words).
                 *
                 * **Rules:**
                 * - If the source has inline keybindings or operational hints (e.g., "(use space to scroll)"),
                 *   extract them out into the `comment` field instead of keeping them here.
                 */
                description: z.string().optional(),
                ...executionFields.shape,
                /**
                 * Platform-specific variations. Use this if commands differ across OS
                 * or if a command only exists on specific operating systems.
                 */
                platforms: z
                  .array(
                    z
                      .object({
                        os: z.array(z.enum(["macos", "linux", "windows"])).min(1),
                      })
                      .merge(executionFields),
                  )
                  .optional(),
              }),
            )
            .optional(),
        }),
      ),
    }),
  }),
};
```

---

### Core Rules & Constraints

1. **Platform Intelligence, Scope & Separation (Crucial):**
   - **No WSL/Git Bash Assumptions:** Do not assume POSIX commands apply to Windows via compatibility layers. For Windows, provide native Windows commands using PowerShell where appropriate (`codeLang: "ps1"`, etc.). Do not use CommandPrompt commands, only PowerShell for Windows.
   - **Refactor OS-Specific Group Titles:** If a group title is heavily tied to a single operating system or specific tool (e.g., `Network Configuration (systemd-networkd)`), you **must** refactor and generalize the group title (e.g., `Network Configuration & Management`) so it is platform-agnostic and capable of housing cross-platform items.
   - **Active Cross-Platform Mapping for Common Actions:** Do not lazily restrict functional concepts to a single OS just because the original source used a Linux-specific utility (like `systemd-networkd` or `networkctl`). If an action has a clear equivalent on macOS or Windows (e.g., viewing network status, restarting services, managing interfaces), you **must** supply the native equivalents across `[macos, linux, windows]` via the `platforms` array rather than defaulting to `os: ["linux"]` alone.
   - **Strict Platform Scoping:**
     - Use the item level **only** if a command is 100% universal and identical across macOS, Linux, and Windows.
     - If a command differs across _any_ platform (even if 2 out of 3 platforms share the same command, or if every platform has a completely different syntax), you **must** use the `platforms` array and declare them explicitly.
     - If a command does not exist or cannot be run on a specific platform, do not include that platform in the `os` array. Every supported platform that has a valid implementation must be declared declaratively.

2. **Completeness, Content Fidelity & Field Correction:**
   - **Mandatory Examples for Code:** Whenever a `code` field (or platform-specific equivalent) contains placeholders or variable arguments (e.g., `<service_name>`, `<iface>`), you **must** provide a corresponding `example` field filled in with a realistic, concrete value (e.g., `nginx` or `eth0`). Omit the `example` field _only_ if the code command has no placeholders/variables and an example would be completely redundant or irrelevant.
   - **Label & Description Constraints (Hard Rules):**
     - Labels and descriptions must **never** be identical or closely similar.
     - **Labels must be 5 words or less.** Never use concrete command examples, code blocks, or platform-specific tools as labels (e.g., use a general label like `Service Status` instead of `systemctl status [service]`).
     - Descriptions must be clean, concise, and ideally **under 15 words**.
   - **Extract Inline Hints to Comments:** If a description contains inline notes, keybindings, or operational hints (e.g., `(use space to scroll, q to quit)`), extract those details out of the description and into the dedicated `comment` field using clean shorthand (e.g., `comment: space=scroll, q=quit`).
   - **Label & Description Generalization (Crucial):** When expanding platform-specific commands into multi-platform items, you **must** generalize labels and descriptions so they describe the abstract action rather than referencing a single OS tool or command syntax.
   - **Deduplication & Consolidation:** There must never be duplicate groups or duplicate items. Automatically consolidate identical groups (such as duplicate "System Information" sections) and eliminate duplicate items.
   - **Platform Accuracy & Missing Equivalents:** Actively fix platform inaccuracies (e.g., removing non-existent systems like macOS from `systemctl` commands). For Unix-specific commands that lack native Windows equivalents, explicitly include native Windows/PowerShell equivalents via the `platforms` array.
   - **Do not gloss over or omit commands.** Every single shortcut, tool, and distinct variation present in the source file must be fully parsed and included in the output.
   - **Fix Misplaced Fields:** If fields in the source data were previously put into the wrong places (e.g., actual executable code placed in `example`, or command variations incorrectly flattened), you **must** correct and remap them to match the correct schema definitions.
   - **Preserve Original Intent:** Do not arbitrarily rewrite or edit descriptions, comments, or regex steps _unless_ they are platform-biased, technically wrong, overly specific due to multi-platform mapping, or require separation into the `comment` field.
3. **Execution Fields & Flexible Comment Placement:**
   - **Top-Level vs. Platform-Specific Comments:** The `comment` field is valid at **both** the item root level (for universal comments/hints that apply across all platforms) and nested inside the `platforms` array (for OS-specific comments or shortcuts).
   - **Contextual Placement:** Place `comment` at the root level if the operational hints apply globally, or push it down inside a specific platform block if the shorthand notes (like keybindings or tool output descriptions) differ across operating systems.
4. **Interactive Clarification First (Crucial):**
   - Before generating the final markdown, carefully review the source file. If any shortcut, platform behavior, or command mapping is genuinely ambiguous or missing critical execution details, **stop and ask clarifying questions first**. Do not guess.

---

### Additional Items Policy

1. **Relevance & Utility Check:** Only add new items if they solve a practical problem, represent common workflows, or fill a genuine knowledge gap in the current cheatsheet.
2. **Consolidation First:** Before adding a new item, scan existing entries. If a similar command, flag, or concept already exists, autonomously evaluate and merge them into a single, cleaner entry rather than creating duplicates.
3. **Anti-Bloat Constraint:** Do not add items arbitrarily just to expand the document. Make autonomous decisions to preserve conciseness, maintain a high signal-to-noise ratio, and prevent document bloat.
4. **Possible additions:**
   - none

---

### Source Markdown File to Refactor:
