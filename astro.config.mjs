// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  site: "https://openfront.wiki",
  integrations: [sitemap()],
  // The game repo README links to openfront.wiki/Map_Making.
  redirects: {
    "/Map_Making": "/Map_Making_Guide",
  },
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
