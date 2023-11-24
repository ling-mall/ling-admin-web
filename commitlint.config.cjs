module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(?<type>.*\s\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },
  // ↓自定义提交消息规则 官方文档： https://commitlint.js.org/#/reference-rules
  rules: {
    // ↓body以空白行开头
    'body-leading-blank': [2, 'always'],
    // ↓footer以空白行开头
    'footer-leading-blank': [1, 'always'],
    // ↓header的最大长度
    'header-max-length': [2, 'always', 108],
    // ↓subject为空
    'subject-empty': [2, 'never'],
    // ↓type为空
    'type-empty': [2, 'never'],
    // type的类型
    'type-enum': [
      2,
      'always',
      [
        // 增加新的特征
        '✨ feat',
        // 修复 bug
        '🐞 fix',
        // 提高性能的代码更改
        '⚡ perf',
        // 不影响代码含义的修改，比如空格、格式化、缺失的分号等
        '🌈 style',
        // 对文档进行了修改
        '📃 docs',
        // 增加确实的测试或者矫正已存在的测试
        '🧪 test',
        // 既不是修复 bug 也不是添加特征的代码重构
        '🦄 refactor',
        // 对构建系统或者外部依赖项进行了修改
        '🔧 build',
        // 对 CI 配置文件或脚本进行了修改,持续集成相关文件修改
        '🐎 ci',
        // 其他修改（不在上述类型中的修改）
        '🐳 chore',
        // 当前 commit 用于撤销以前的 commit，后面跟着被撤销 Commit 的 Header
        '🔄 revert',
        // 开发中
        '🚧 wip',
        // 工作流修改
        '🗃️ workflow',
        // 类型修改
        '📦 types',
        // 发布新版本
        '🪧 release'
      ]
    ]
  }
}
