import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import prettierConfig from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  reactRefresh.configs.vite,
  reactHooks.configs.flat.recommended,
  prettierConfig,
  eslintPluginPrettierRecommended,
]);
