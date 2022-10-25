import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // 因为内部使用到了 this，所以这里需要绑定一下 this
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  return instance as AxiosInstance
}

const axios: AxiosInstance = createInstance()

export default axios
