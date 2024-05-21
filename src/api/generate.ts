import { defHttp } from '@/utils/http/axios'

export const getGenerateTemplateGroupTree = () => {
  return defHttp.get<any[]>({
    url: '/foundation/generate/template/group/tree/1'
  })
}
