// fs-extra 是 fs 的一个扩展，对文件系统进行操作
import fs from 'fs-extra'

import { getConfigFileName, getEnvConfig, getRootPath } from '../utils'
import pkg from '../../package.json'
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../configConstant'

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2)

    // 生成配置文件
    if (!argvList.includes('disabled-config')) {
      /** VITE_GLOB_ 开头的配置信息 */
      const config = getEnvConfig()
      /** 变量名 */
      const configVarName = getConfigFileName(config)
      /** 生成最终存储变量名 */
      const windowConf = `window.${configVarName}`
      /** 文件内容 */
      let configStr = `${windowConf}=${JSON.stringify(config)};`
      // Object.freeze 与 Object.defineProperty 确保变量在使用中不会被修改
      configStr += `
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configVarName}", {
        configurable: false,
        writable: false,
      });
      `.replace(/\s/g, '')

      // 创建文件夹
      fs.mkdirp(getRootPath(OUTPUT_DIR))
      // 写入文件
      fs.outputFileSync(getRootPath(`${OUTPUT_DIR}/${GLOB_CONFIG_FILE_NAME}`), configStr)
    }

    console.log(`✨ ${pkg.name}` + ' - build successfully!')
  } catch (error) {
    console.log('vite build error:\n' + error)
    process.exit(1)
  }
}
runBuild()
