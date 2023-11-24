'use strict'

module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat    : 增加新的特性' },
    { value: '🐞 fix', name: '🐞 fix     : 修复 bug' },
    { value: '⚡ perf', name: '⚡ perf    : 提高性能的代码更改' },
    {
      value: '🌈 style',
      name: '🌈 style   : 不影响代码含义的修改，比如空格、格式化、缺失的分号等'
    },
    { value: '📃 docs', name: '📃 docs    : 对文档进行了修改' },
    { value: '🧪 test', name: '🧪 test    : 增加确实的测试或者矫正已存在的测试' },
    { value: '🦄 refactor', name: '🦄 refactor: 既不是修复 bug 也不是添加特征的代码重构' },
    { value: '🔧 build', name: '🔧 build   : 对构建系统或者外部依赖项进行了修改' },
    { value: '🐎 ci', name: '🐎 ci      : 对 CI 配置文件或脚本进行了修改,持续集成相关文件修改' },
    { value: '🐳 chore', name: '🐳 chore   : 其他修改（不在上述类型中的修改）' },
    {
      value: '🔄 revert',
      name: '🔄 revert  : 当前 commit 用于撤销以前的 commit，后面跟着被撤销 Commit 的 Header'
    },
    { value: '⚙️ wip', name: '⚙️ wip      : 开发中' },
    { value: '🗃️ workflow', name: '🗃️  workflow : 工作流修改' },
    { value: '📦 types', name: '📦 types   : 类型修改' },
    { value: '🪧 release', name: '🪧  release  : 发布新版本' }
  ],
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选):\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如:#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },
  // 允许自定义作用域
  allowCustomScopes: true,

  // 有范围后可以添加你的范围进去，比如模块1，功能1
  scopes: [],

  // 破坏性更新时前缀
  breakingPrefix: '🚧 BREAKING CHANGES 🚧',
  // 这些选项触发破坏性更新选项
  allowBreakingChanges: ['feat', 'fix', 'chore'],
  // ISSUE 前缀
  footerPrefix: 'CLOSES ISSUE:',
  // 主题的最大字符数
  subjectLimit: 100
}
