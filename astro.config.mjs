// @ts-check
import preact from "@astrojs/preact";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightThemeRapide from "starlight-theme-rapide";

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
    preact(),
  ],
});
