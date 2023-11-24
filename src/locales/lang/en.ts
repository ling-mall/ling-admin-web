import { genMessage } from '../helper'

const modules = import.meta.glob('./en/**/*.json', { eager: true })
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'en')
  }
}
