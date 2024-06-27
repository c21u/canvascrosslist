module.exports = {
  extends: ["google", "plugin:prettier/recommended", "plugin:json/recommended"],
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  overrides: [
    {
      files: ["client/**/*.js*"],
      extends: [
        "google",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:json/recommended",
      ],
      plugins: ["react"],
      parser: "@babel/eslint-parser",
      settings: {
        react: {
          version: "detect",
        },
      },
      ecmaFeatures: {
        jsx: true,
      },
    },
    {
      files: ["e2e/**/*.js"],
      globals: { cy: "readonly", Cypress: "readonly" },
    },
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
  },
  rules: {
    "no-undef": "error",
  },
};
