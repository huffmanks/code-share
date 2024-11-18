// @ts-check
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import starlightThemeObsidian from "starlight-theme-obsidian";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  integrations: [
    starlight({
      title: "CodeShare",
      description: "Codeshare is your go-to platform for clear, practical coding guides and reusable code snippets.",
      customCss: ["./src/tailwind.css"],
      components: {
        SocialIcons: "./src/components/social-icons.astro",
        PageSidebar: "./src/components/page-sidebar.astro",
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
          autogenerate: { directory: "snippets" },
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
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
