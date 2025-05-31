// @ts-check
import { defineConfig } from "esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/assets/style.css",
  },
  ignores: [],
});
