/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  extends: [
    // Use all of the rules of the installed plugins.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    // Some of the plugins above may cause conflicts between eslint and prettier
    // Put these 2 below so they override all of the plugins above => fix the problems
    "eslint-config-prettier",
    "prettier",
  ],
  plugins: ["prettier"],
  settings: {
    react: {
      // Auto-detect react version
      version: "detect",
    },
    // Tell ESlint the correct import format, so that it doesn't show the error when importing components, pages, ...e.t.c
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "")],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  env: {
    node: true,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-target-blank": "warn",
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: true,
        trailingComma: "all",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        singleQuote: false,
        printWidth: 120,
        jsxSingleQuote: false,
        singleAttributePerLine: true,
      },
    ],
  },
};
