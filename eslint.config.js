// @ts-check
import { defineConfig } from "esmate/eslint";

export default defineConfig(
  {
    type: "app",
    react: true,
    ignores: ["src/utilities/storefront/zeus", "src/utilities/env.ts"],
  },
  {
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
);
