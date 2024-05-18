import path from 'path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import colors from 'picocolors'
import pkg from '../../../package.json'

async function generateIcon() {
  const dir = path.resolve(process.cwd(), 'node_modules/@iconify/json')

  const raw = await fs.readJSON(path.join(dir, 'collections.json'))

  const collections = Object.entries(raw).map(([id, v]) => ({
    ...(v as any),
    id
  }))

  const choices = collections.map((item) => ({ key: item.id, value: item.id, name: item.name }))

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'useType',
        choices: [
          { key: 'local', value: 'local', name: 'Local' },
          { key: 'onLine', value: 'onLine', name: 'OnLine' }
        ],
        message: 'How to use icons?'
      },
      {
        type: 'list',
        name: 'iconSet',
        choices: choices,
        message: 'Select the icon set that needs to be generated?'
      },
      {
        type: 'input',
        name: 'output',
        message: 'Select the icon set that needs to be generated?',
        default: 'src/components/Icon/data'
      }
    ])
    .then(async (answers) => {
      // 解构赋值获取 answers 对象中的 iconSet、output 和 useType 属性
      const { iconSet, output, useType } = answers

      // 拼接输出目录的绝对路径
      const outputDir = path.resolve(process.cwd(), output)

      // 确保输出目录存在，不存在则创建
      fs.ensureDir(outputDir)

      // 根据 iconSet 过滤生成集合数组
      const genCollections = collections.filter((item) => [iconSet].includes(item.id))

      // 声明一个字符串数组用于存储前缀
      const prefixSet: string[] = []

      // 遍历生成集合数组
      for (const info of genCollections) {
        // 读取 JSON 文件
        const data = await fs.readJSON(path.join(dir, 'json', `${info.id}.json`))
        if (data) {
          // 获取数据中的前缀信息
          const { prefix, info } = data
          console.log(info.name)

          // 判断是否为本地类型
          const isLocal = useType === 'local'

          // 获取图标数组并添加前缀或命名空间
          const icons = Object.keys(data.icons).map(
            (item) => `${isLocal ? prefix + ':' : ''}${item}`
          )

          // 将图标数据写入文件
          await fs.writeFileSync(
            path.join(output, `icons.data.ts`),
            `export default ${isLocal ? JSON.stringify(icons) : JSON.stringify({ prefix, icons })}`
          )

          // 将前缀添加到前缀集合数组中
          prefixSet.push(prefix)
        }
      }

      // 清空 Vite 缓存目录
      fs.emptyDir(path.join(process.cwd(), 'node_modules/.vite'))

      // 打印生成成功的消息
      console.log(
        `✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - Icon generated successfully:' + `[${prefixSet}]`
      )
    })
}

generateIcon()
