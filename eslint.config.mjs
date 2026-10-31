import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const typescriptRules = {
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    },
  ],
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/consistent-type-imports": [
    "error",
    { prefer: "type-imports", fixStyle: "inline-type-imports" },
  ],
};

export default defineConfig([
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: typescriptRules,
  },

  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: typescriptRules,
  },

  globalIgnores([
    ".astro/**",
    "dist/**",
    "public/**",
    "scripts/**",
    "src/content/**",
    "src/files/**",
  ]),
]);
