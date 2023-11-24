import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

export function isDevFn(mode: string): boolean {
  return mode === 'development'
}

export function isProdFn(mode: string): boolean {
  return mode === 'production'
}

/**
 * 是否生成包预览
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}

/**
 * 读取所有环境变量,并将它们转化成对应的类型(转化前都是字符串)，并将所有环境变量配置文件读取到 process.env
 * 之后可以通过 import.meta.env 访问
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    // 代理对象是json格式的,转为数组
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}

/**
 * 获取当前环境下生效的配置文件名 .env 文件是必生效的，加上当前环境的文件 例如：.env.development
 *.env               # 在所有的环境中被载入
 *.env.local          # 在所有的环境中被载入，但会被 git 忽略
 *.env.[mode]         # 只在指定的模式中被载入
 *.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script
  const reg = new RegExp('--mode ([a-z_\\d]+)')
  const result = reg.exec(script as string) as any
  if (result) {
    const mode = result[1] as string
    return ['.env', `.env.${mode}`]
  }
  return ['.env', '.env.production']
}

/**
 * 获取以指定前缀开头的环境变量，默认读取当前环境已生效的配置文件
 * @param match prefix 前缀
 * @param confFiles ext 配置文件名称
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {}
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
      console.log(env)
      envConfig = { ...envConfig, ...env }
    } catch (e) {
      console.error(`Error in parsing ${item}`, e)
    }
  })
  const reg = new RegExp(`^(${match})`)
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig
}

/**
 * 获取用户根目录
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}

/**
 * 获取配置文件变量名,用于储存生产环境的变量
 * 生产环境中的公共配置变量 会从 window.变量名 获取，从 _app.config.js 文件中写入
 * 例如: 标题 APi接口地址
 * @param env
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '')
}
