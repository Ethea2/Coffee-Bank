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
      // Ignore unused variables with an underscore prefix (commonly used for unused params)
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // Ignores unused function parameters starting with an underscore (e.g., _param)
          varsIgnorePattern: "^_", // Ignores unused variables starting with an underscore
          args: "after-used", // Check for unused arguments only after the function body is processed
        }
      ],

      // If you want to entirely disable unused imports check
      "no-unused-imports": "off",  // Disable checking unused imports globally

      // Optionally disable 'no-unused-vars' for specific cases if not using plugin
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    }
  }
];

export default eslintConfig;
