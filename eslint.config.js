/* eslint-disable */
const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");
const pluginVue = require("eslint-plugin-vue");

/** @type {import('eslint').Linter.Config[]} */

module.exports = [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    name: "Ignore .venv",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", '**/.vite/**, "**/.venv/**"'],
  },
];
