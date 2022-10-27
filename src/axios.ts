import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './defaults'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'

function createInstance(defaultConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(defaultConfig)
  // 因为内部使用到了 this，所以这里需要绑定一下 this
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  return instance as AxiosStatic
}

const axios: AxiosStatic = createInstance(defaults)

// 添加 create 方法
axios.create = function(config: AxiosRequestConfig): AxiosInstance {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
