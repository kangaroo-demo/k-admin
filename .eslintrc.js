module.exports = {
  root: true,
  env: {
    node: true,
    // The Follow config only works with eslint-plugin-vue v8.0.0+
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 去掉函数()前面的空格
    'space-before-function-paren': 'off',
    // 关闭vue组件名称的驼峰命名规则
    'vue/multi-word-component-names': 0
  }
}
