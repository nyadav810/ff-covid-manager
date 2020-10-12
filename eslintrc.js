module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  ignorePatterns: "node_modules",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never",
        mjs: "never",
      },
    ],
    quotes: [2, "single"],
    "jsx-quotes": [2, "prefer-single"],
  },
  settings: {
    "import/resolver": "webpack",
  },
};
