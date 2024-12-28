import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unused parameters starting with "_"
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // Ignores unused parameters starting with "_"
          varsIgnorePattern: "^_", // Ignores unused variables starting with "_"
          args: "after-used", // Check for unused arguments only after the function body is processed
        }
      ],

      // Ensure that TypeScript's rule for unused variables allows unused params starting with "_"
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // Ignores unused parameters starting with "_"
          varsIgnorePattern: "^_", // Ignores unused variables starting with "_"
          args: "after-used", // Check for unused arguments only after the function body is processed
        }
      ],

      // Optionally use this plugin to clean unused imports
    }
  }
];

export default eslintConfig;
