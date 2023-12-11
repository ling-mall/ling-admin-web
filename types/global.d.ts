import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent
} from 'vue'

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  declare type VueNode = VNodeChild | JSX.Element

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  declare type Nullable<T> = T | null
  declare type NonNullable<T> = T extends null | undefined ? never : T
  declare type Recordable<T = any> = Record<string, T>
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  declare type Indexable<T = any> = {
    [key: string]: T
  }
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  declare interface WheelEvent {
    path?: EventTarget[]
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  /** 从 env 文件中读取的环境变量 */
  declare interface ViteEnv {
    /** 项目运行端口号 */
    VITE_PORT: number
    /**资源公共路径,需要以 /开头和结尾 */
    VITE_PUBLIC_PATH: string
    /**
     * 本地开发代理，可以解决跨域及多地址代理
     * 如果接口地址匹配到，则会转发到http://localhost:3000，防止本地出现跨域问题
     * 可以有多个，注意多个不能换行，否则代理将会失效
     */
    VITE_PROXY: [string, string][]
    /** 网站标题 */
    VITE_GLOB_APP_TITLE: string
    /**简称，用于配置文件名字 不要出现空格、数字开头等特殊字符 */
    VITE_GLOB_APP_SHORT_NAME: string
    /**是否删除Console.log 日志 */
    VITE_DROP_CONSOLE: boolean
    /**打包是否压缩图片 */
    VITE_USE_IMAGEMIN: boolean
  }

  declare function parseInt(s: string | number, radix?: number): number

  declare function parseFloat(string: string | number): number

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>
}
