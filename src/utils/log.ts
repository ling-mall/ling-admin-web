/**打印项目相关日志 */

/**项目名 */
const projectName = import.meta.env.VITE_GLOB_APP_TITLE

/**警告 */
export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`)
}

/**错误 */
export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
}
