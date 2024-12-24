// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightThemeObsidian from "starlight-theme-obsidian";

import icon from "astro-icon";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  integrations: [
    starlight({
      title: "CodeShare",
      description: "Codeshare is your go-to platform for clear, practical coding guides and reusable code snippets.",
      customCss: ["./src/index.css"],
      components: {
        SocialIcons: "./src/components/global/social-icons.astro",
        PageSidebar: "./src/components/global/page-sidebar.astro",
      },
      expressiveCode: {
        themes: ["github-dark-default", "github-light"],
        frames: {
          removeCommentsWhenCopyingTerminalFrames: true,
        },
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            {
              label: "Linux",
              items: [
                {
                  label: "Getting started",
                  link: "guides/linux",
                },
                {
                  label: "Mount external HDD",
                  link: "guides/linux/mount-external-hdd",
                },
                {
                  label: "Security",
                  link: "guides/linux/security",
                },
                {
                  label: "Install apps",
                  collapsed: true,
                  autogenerate: { directory: "guides/linux/install-apps" },
                },
              ],
            },
            {
              label: "MacOS",
              autogenerate: { directory: "guides/macos" },
            },
          ],
        },
        {
          label: "Snippets",
          link: "snippets",
        },
      ],
      plugins: [
        starlightThemeObsidian({
          // @ts-ignore
          graphConfig: {
            visibilityRules: [],
          },
        }),
      ],
    }),
    icon(),
    db(),
  ],
});
