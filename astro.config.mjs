// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  site: "https://openfront.wiki",
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
