const toString = Object.prototype.toString

// 判断是否为 Date 类型
export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]'
}

// 判断是否为对象
export function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object'
}

// 判断是否为普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 进行拷贝
export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
