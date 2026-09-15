import js from "@eslint/js"
import boundaries from "eslint-plugin-boundaries"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      boundaries,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "pages", pattern: "src/pages/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "shared", pattern: "src/shared/**" },
      ],
    },
    rules: {
      "boundaries/no-unknown-files": "error",
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            {
              allow: {
                to: { module: { origin: "external" } },
              },
            },
            {
              allow: {
                dependency: {
                  relationship: { to: "internal" },
                },
              },
            },
            {
              from: { element: { type: "app" } },
              allow: { to: { element: { type: "pages" } } },
            },
            {
              from: { element: { type: "app" } },
              allow: { to: { element: { type: "features" } } },
            },
            {
              from: { element: { type: "app" } },
              allow: { to: { element: { type: "entities" } } },
            },
            {
              from: { element: { type: "app" } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              from: { element: { type: "pages" } },
              allow: { to: { element: { type: "features" } } },
            },
            {
              from: { element: { type: "pages" } },
              allow: { to: { element: { type: "entities" } } },
            },
            {
              from: { element: { type: "pages" } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              from: { element: { type: "features" } },
              allow: { to: { element: { type: "entities" } } },
            },
            {
              from: { element: { type: "features" } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              from: { element: { type: "entities" } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              from: { element: { type: "shared" } },
              allow: { to: { element: { type: "shared" } } },
            },
          ],
        },
      ],
    },
  },
])
