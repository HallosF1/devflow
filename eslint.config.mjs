import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "standard",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),
  ...compat.plugins("import"),
  {
    ignores: ["components/ui/**"], // Ignore patterns
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Built-in types are first
            "external", // External libraries
            "internal", // Internal modules
            ["parent", "sibling"], // Parent and sibling types mingled together
            "index", // Then the index file
            "object", // Object imports
          ],
          newlinesBetween: "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    overrides: [
      {
        files: ["*.ts", "*.tsx"], // TypeScript files
        rules: {
          "no-undef": "off", // Disable no-undef for TS files
        },
      },
    ],
  },
];

export default eslintConfig;
