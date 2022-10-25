// 入口文件
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index'
import xhr from './xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理 配置
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)
}

// 转换url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 转换请求 body
function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

// 转换请求 headers
function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 转换相应的 data
function transformResponseData(response: AxiosResponse): AxiosResponse {
  const { data } = response
  response.data = transformResponse(data)
  return response
}
