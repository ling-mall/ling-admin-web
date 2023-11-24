// 详解配置https://www.bbsmax.com/A/QW5YV9eedm/
// @ts-check
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  // ↓默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  // 以当前目录为根目录，不再向上查找 .eslintrc.js
  root: true,
  // ↓指定你想启用的环境
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // ↓设置解析器
  parser: 'vue-eslint-parser',
  // ↓解析器选项
  parserOptions: {
    //  Typescript语法的解析器 项目地址： https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser
    parser: '@typescript-eslint/parser',
    // 使用最新版
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    './.eslintrc-auto-import.json'
  ],
  // ↓自定义规则配置
  rules: {
    // ↓禁止使用@ts-ignore来消除ESLint检查
    '@typescript-eslint/ban-ts-ignore': 'off',
    // ↓在函数和类方法上需要显式的返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    // ↓禁止使用any类型
    '@typescript-eslint/no-explicit-any': 'off',
    // ↓除导入语句外，禁止使用require语句
    '@typescript-eslint/no-var-requires': 'off',
    // ↓禁止使用空函数
    '@typescript-eslint/no-empty-function': 'off',
    // ↓对自定义事件名称强制使用特定的大小写
    'vue/custom-event-name-casing': 'off',
    // ↓禁止定义前使用
    'no-use-before-define': 'off',
    // ↓在定义变量之前不允许使用变量
    '@typescript-eslint/no-use-before-define': 'off',
    // ↓禁止使用@ts-注解
    '@typescript-eslint/ban-ts-comment': 'off',
    // ↓禁止使用特定类型
    '@typescript-eslint/ban-types': 'off',
    // ↓禁止使用!后缀运算符进行非null断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // ↓在导出的函数和类的公共类方法上需要显式的返回值和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // // ↓禁止未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    // ↓禁止未使用的变量
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    // 禁止未使用的组件
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true
      }
    ],
    'vue/no-unused-vars': 'error',
    // ↓在函数括号前需要或不允许有空格
    'space-before-function-paren': 'off',
    // ↓强制属性顺序
    'vue/attributes-order': 'off',
    // ↓强制每个组件应位于其自己的文件中
    'vue/one-component-per-file': 'off',
    // ↓在标签的右括号之前要求或不允许换行
    'vue/html-closing-bracket-newline': 'off',
    // ↓强制每行的最大属性数
    'vue/max-attributes-per-line': 'off',
    // ↓在多行元素的内容之前和之后需要换行
    'vue/multiline-html-element-content-newline': 'off',
    // ↓在单行元素的内容之前和之后需要换行
    'vue/singleline-html-element-content-newline': 'off',
    // ↓在模板中的自定义组件上实施属性命名样式
    'vue/attribute-hyphenation': 'off',
    // ↓需要道具的默认值
    'vue/require-default-prop': 'off',
    // ↓实施自我封闭的风格
    // 'vue/html-self-closing': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    // 使用script-setup需要引入这个,当组件未使用或者变量未使用时做的操作
    'vue/script-setup-uses-vars': 'error'
  }
})
