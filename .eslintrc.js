// http://eslint.org/docs/user-guide/configuring
// http://eslint.cn/docs/user-guide/configuring 中文
module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-useless-escape": 0,
    "no-unused-vars": 0,
    // 强制在 function的左括号之前使用一致的空格
    "space-before-function-paren": [0, "always"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
