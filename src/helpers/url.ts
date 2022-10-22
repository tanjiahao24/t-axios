import { isDate, isPlainObject } from './util'

// 进行 url 编码
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 构建 url
export function buildURL(url: string, params?: any): string {
  // 如果没有传递 params，那么就直接返回 url 即可
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const value = params[key]

    // 如果是 null 或者是 undefined 就给过滤掉
    if (value === null || value === undefined) {
      return
    }

    // 所有数据类型都转为数组形式
    let values = []
    if (Array.isArray(value)) {
      values = value
      // 如果是数组的形式就需要将 key 值进行转换
      key += '[]'
    } else {
      values = [value]
    }
    values.forEach(val => {
      // 对 val 进行处理
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 判断是否存在 hash
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    }

    // 处理是否已经拼接参数
    url += (url.includes('?') ? '&' : '?') + serializedParams
  }

  return url
}
