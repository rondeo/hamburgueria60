module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  globals: {
    cy: "readonly",
    before: "readonly"
  },
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack.config.js"
      }
    }
  },
  plugins: ["eslint-plugin-import-order-alphabetical"],
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  rules: {
    quotes: [2, 'single', {
      avoidEscape: true
    }],
    'react/prop-types': false,
    'import/prefer-default-export': false,
    'import/no-named-as-default': false,
    'prettier/prettier': ['error', {
      singleQuote: true
    }],
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-extraneous-dependencies': {
      moduleDirectories: ['./']
    },
    'prefer-destructuring': 0,
    'import/order': [
      'error',
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        'newlines-between': 'always'
      },
    ],
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};