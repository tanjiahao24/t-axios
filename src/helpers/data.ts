import { isPlainObject } from './util'

// 处理 body 参数
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
