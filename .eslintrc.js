module.exports = {
  root: true,

  env: {
    node: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  // extends: ["plugin:vue/recommended", "eslint:recommended", "@vue/prettier"]
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-multiple-template-root': 'warn'
  },

  'extends': 'plugin:vue/recommended'
};
