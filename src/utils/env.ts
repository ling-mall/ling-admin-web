/**
 * 环境变量相关操作工具类，vite 有关环境变量的配置文档在 https://cn.vitejs.dev/guide/env-and-mode.html
 */

import type { GlobEnvConfig } from '#/config'

import { warn } from '@/utils/log'
import pkg from '../../package.json'
import { getConfigFileName } from '../../build/utils'

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

/** 根据版本生成缓存 key */
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

/** 获取应用公共的环境变量 */
export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env)

  /**
   * 如果处于开发环境 则获取 import.meta.env 上的环境变量，在 vite.config.ts 文件中写入配置
   * 如果处于生产环境中 则获取通过 index.html 引入的 _app.config.js 文件写入的环境变量
   * _app.config.js 由 build\script\postBuild.ts 进行生成，在 build\vite\plugin\html.ts 通过 vite-plugin-html 进行引入
   */
  const ENV = (import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX
  } = ENV

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    )
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX
  }
}

/**
 * @description: 开发模式
 */
export const devMode = 'development'

/**
 * @description: 生产模式
 */
export const prodMode = 'production'

/**
 * @description: 获取应用运行的模式
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * @description: 应用当前是否属于开发模式
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description:应用当前是否属于生产模式
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
