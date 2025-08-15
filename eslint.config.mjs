import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Type recommended rules
  ...tseslint.config(...tseslint.configs.recommendedTypeChecked),
  // Type stricter rules
  ...tseslint.config(...tseslint.configs.strictTypeChecked),
  //  Best practice for modern TypeScript codebases (code patterns)
  ...tseslint.config(...tseslint.configs.stylisticTypeChecked),
  pluginReact.configs.flat.recommended,
  reactX.configs["recommended-typescript"],
  reactDom.configs.recommended,

  // Custom rules and settings
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: false,
          allowHigherOrderFunctions: false,
          allowTypedFunctionExpressions: false, // stricter
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
];

export default eslintConfig;
