import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }

  // 兼容传递一个函数
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => (data = fn(data, headers)))

  return data
}
