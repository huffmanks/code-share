// @ts-check
import preact from "@astrojs/preact";
import starlight from "@astrojs/starlight";
import { defineConfig, passthroughImageService } from "astro/config";
import starlightThemeRapide from "starlight-theme-rapide";

export default defineConfig({
  site: "https://codeshare.huffmanks.com",
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    starlight({
      title: "Code Share",
      description: "Code Share is your go-to platform for clear, practical coding guides and reusable code snippets.",
      customCss: ["./src/styles/global.css"],
      logo: {
        src: "./src/assets/image.svg",
      },
      plugins: [starlightThemeRapide()],
      expressiveCode: {
        frames: {
          removeCommentsWhenCopyingTerminalFrames: true,
        },
        useThemedScrollbars: false,
        styleOverrides: {
          frames: {
            inlineButtonBackground: "rgb(39, 39, 42)",
            inlineButtonForeground: "var(--sl-color-accent-high)",
            inlineButtonBorder: "var(--sl-color-gray-5)",
            inlineButtonBackgroundActiveOpacity: "1",
            inlineButtonBackgroundHoverOrFocusOpacity: "1",
            inlineButtonBackgroundIdleOpacity: "1",
            inlineButtonBorderOpacity: "1",
            tooltipSuccessBackground: "#2b7256",
            tooltipSuccessForeground: "#e3dcdc",
          },
        },
      },
      components: {
        SocialIcons: "./src/components/social-icons.astro",
        ContentPanel: "./src/components/content-panel.astro",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            {
              label: "Linux",
              collapsed: true,
              items: [
                {
                  label: "Getting started",
                  slug: "guides/linux",
                },
                {
                  label: "Mount external HDD",
                  slug: "guides/linux/mount-external-hdd",
                },
                {
                  label: "Security",
                  slug: "guides/linux/security",
                },
                {
                  label: "Docker",
                  collapsed: true,
                  items: [
                    {
                      label: "Getting started",
                      slug: "guides/linux/docker",
                    },
                    {
                      label: "Apps",
                      collapsed: true,
                      autogenerate: { directory: "guides/linux/docker/apps", collapsed: true },
                    },
                  ],
                },
              ],
            },
            {
              label: "macOS",
              collapsed: true,
              autogenerate: { directory: "guides/macos" },
            },
          ],
        },
        {
          label: "Cheatsheets",
          collapsed: true,
          items: [
            {
              label: "Docker",
              link: "cheatsheets/docker",
            },
            {
              label: "Git",
              link: "cheatsheets/git",
            },
            {
              label: "JQ",
              link: "cheatsheets/jq",
            },
            {
              label: "Markdown",
              link: "cheatsheets/markdown",
            },
            {
              label: "Nano",
              link: "cheatsheets/nano",
            },
            {
              label: "Python",
              link: "cheatsheets/python",
            },
            {
              label: "Regex",
              link: "cheatsheets/regex",
            },
            {
              label: "Terminal",
              link: "cheatsheets/terminal",
            },
            {
              label: "Vim",
              link: "cheatsheets/vim",
            },
          ],
        },
        {
          label: "Snippets",
          link: "snippets",
        },
      ],
    }),
    preact(),
  ],
});
