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
    preact(),
    starlight({
      title: "CodeShare",
      description: "CodeShare is your go-to platform for clear, practical coding guides and reusable code snippets.",
      head: [
        {
          tag: "meta",
          attrs: {
            name: "image",
            property: "image",
            content: "https://codeshare.huffmanks.com/meta.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "og:image",
            property: "og:image",
            content: "https://codeshare.huffmanks.com/meta.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            property: "twitter:image",
            content: "https://codeshare.huffmanks.com/meta.png",
          },
        },
      ],
      customCss: ["./src/styles/global.css"],
      logo: {
        src: "./src/assets/logo.svg",
      },
      components: {
        ContentPanel: "./src/components/content-panel.astro",
        SocialIcons: "./src/components/social-icons.astro",
        ThemeSelect: "./src/components/theme-select.astro",
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
                  label: "Wake-on-LAN (WOL)",
                  slug: "guides/linux/wake-on-lan",
                },
              ],
            },
            {
              label: "macOS",
              collapsed: true,
              items: [
                {
                  label: "Getting started",
                  slug: "guides/macos",
                },
                {
                  label: "nix-darwin",
                  slug: "guides/macos/nix-darwin",
                },
              ],
            },
            {
              label: "Docker",
              collapsed: true,
              items: [
                {
                  label: "Getting started",
                  slug: "guides/docker",
                },
                {
                  label: "Apps",
                  collapsed: true,
                  autogenerate: { directory: "guides/docker/apps", collapsed: true },
                },
              ],
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
  ],
});
