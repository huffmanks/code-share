// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightThemeRapide from "starlight-theme-rapide";

import icon from "astro-icon";

export default defineConfig({
  integrations: [
    starlight({
      title: "Code Share",
      description: "Code Share is your go-to platform for clear, practical coding guides and reusable code snippets.",
      customCss: ["./src/styles/global.css"],
      plugins: [starlightThemeRapide()],
      expressiveCode: {
        frames: {
          removeCommentsWhenCopyingTerminalFrames: true,
        },
      },
      components: {
        SocialIcons: "./src/components/social-icons.astro",
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
    }),
    icon(),
  ],
});
