module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-param-reassign': 0,
    "prettier/prettier": "error"
  },
};
