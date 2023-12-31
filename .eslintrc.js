console.log('eslint config running.')
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    //"@vue/prettier",
    //"@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    exclude: ['node_modules'],
  },
  // settings: { 
  //   "import/resolver": { 
  //       alias: [
  //           ["@", "./src"]
  //       ], 
  //   }, 
  // }, 
  rules: {
    //严格的检查缩进问题，不是报错，我们可以关闭这个检查规则,然后在终端输入npm run dev
    indent: ['off', 2],
    //使用eslint时，严格模式下，报错Missing space before function parentheses的问题，意思是在方法名和刮号之间需要有一格空格。
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //关闭prettier
    // 'prettier/prettier': 'off',
    // 'vue/no-unused-components': 'off',
    'no-unused-vars': 'off',
    'no-unreachable': 'off',
    'vue/no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'no-case-declarations': 'off',
    'vue/no-parsing-error': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-empty': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    'prefer-const': 'off',
    'no-extra-boolean-cast': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-empty-interface': 'off',

    '@typescript-eslint/no-unused-var': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    //
    'no-async-promise-executor': 'off',
    // 允许函数嵌套函数
    'no-inner-declarations': 'warn',
    // while(true) 都不允许写么
    'no-constant-condition': ['error', { checkLoops: false }],
    'prefer-spread': 'off',
    'no-dupe-else-if':'off'
  },
}
