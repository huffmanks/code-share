// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

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
        TableOfContents: "./src/components/table-of-contents/index.astro",
      },
      expressiveCode: {
        themes: ["github-dark-default", "github-light"],
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            {
              label: "Linux",
              autogenerate: { directory: "guides/linux" },
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
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
