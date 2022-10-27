import { isPlainObject, deepMerge } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

const strates = Object.create(null)

// 合并策略
function defaultStrate(value1: any, value2: any): any {
  return typeof value2 !== 'undefined' ? value2 : value1
}

function fromValue2Strate(value1: any, value2: any): any {
  if (typeof value2 !== 'undefined') {
    return value2
  }
}

function deepMergeStrate(value1: any, value2: any): any {
  if (isPlainObject(value2) && isPlainObject(value1)) {
    return deepMerge(value1, value2)
  } else if (value2 !== undefined) {
    return value2
  } else if (isPlainObject(value1)) {
    return deepMerge(value1)
  } else if (value1 !== undefined) {
    return value1
  }
}

const strateKeysFromValue2 = ['url', 'params', 'data']
strateKeysFromValue2.forEach(key => {
  strates[key] = fromValue2Strate
})

const strateKeysDeepMerge = ['headers']
strateKeysDeepMerge.forEach(key => {
  strates[key] = deepMergeStrate
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig = {}
): AxiosRequestConfig {
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strate = strates[key] || defaultStrate
    config[key] = strate(config1[key], config2[key])
  }

  return config
}
