// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': [0],
    // 关闭语句强制分号结尾
    "semi": [0],
    // 关闭禁用tab键
    'no-tabs':[0],
    // 关闭空格tab混用
    'no-mixed-spaces-and-tabs': [0],
    //关闭闭合标签
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    //关闭空格检测
    'no-trailing-spaces': [0]
  }
}
