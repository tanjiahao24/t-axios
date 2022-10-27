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

// 深度合并对象
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      if (isPlainObject(value)) {
        // 判断result中是否已经存在了
        if (isPlainObject(result[key])) {
          result[key] = deepMerge(result[key], value)
        } else {
          result[key] = deepMerge({}, value)
        }
      } else {
        result[key] = value
      }
    })
  })

  return result
}
