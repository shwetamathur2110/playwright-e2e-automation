import typescript from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import typescriptParser from "@typescript-eslint/parser";
const { configs: typescriptConfigs } = typescript;

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      "playwright": playwright,
      "@typescript-eslint/recommended-type-checked": typescriptConfigs['recommended-type-checked']
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
      }
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...typescriptConfigs['recommended-type-checked'].rules,
      ...playwright.configs['flat/recommended'].rules,
      "no-console": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "playwright/missing-playwright-await": "error",
      "prefer-web-first-assertions": "error",
      "no-focused-test": "warn",
      "no-skipped-test": "warn",
      "no-wait-for-timeout": "error",
      "prefer-locator":"error",
      "no-only-test": "warn",
    }
  }
];