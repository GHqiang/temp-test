import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 参考文档 ：https://www.kancloud.cn/yunye/axios/234845
// create an axios 实例
const service = axios.create({
  withCredentials: true,
  baseURL: '',
  timeout: 15000
  // headers: { 'Content-Type': 'application/json' }
})

// 拦截重复请求
const pending = []
const removePending = (key, cancel) => {
  if (pending.includes(key)) {
    cancel(`${decodeURIComponent(key)} 取消重复请求`)
  } else {
    pending.push(key)
    // console.log('new-pending', pending)
  }
}
const clearReq = config => {
  // 由于请求后的url是全部路径，包括data如果有值的话会被转成json字符串（目前发现params不会）
  const oldUrl = config.url.replace(config.baseURL, '')
  // console.log('oldUrl', oldUrl)
  const oldData = config.data && typeof config.data === 'string' ? JSON.parse(config.data) : config.data
  const newConfig = { ...config, url: oldUrl, data: oldData }
  // console.log('newConfig', newConfig)
  const key = getRequestIdentify(newConfig)
  // 这是由于接口前面的syb封装有的写的是syb有的是/syb
  const inx = pending.findIndex(item => item === key || item === '%2F' + key)
  if (inx !== -1) pending.splice(inx, 1)
}
/**
 * 由于我们请求用了代理 直接代理到测试服务器 因此请求响应拦截器的config.url是一致的，不需要标识值区分
 * 如果请求拦截器和响应拦截器的config.url不一致，就需要一个标识值用来区分判断
 */
const getRequestIdentify = (config) => {
  // console.log('config-url', config.url)
  // console.log('config-data', config.data)
  // console.log('config-params', config.params)
  // 返回url及请求参数 post方法请求参数为config.data  get方法请求参数为config.params
  if (config.method === 'post') {
    return encodeURIComponent(config.url + (config.data ? JSON.stringify(config.data) : ''))
  }
  return encodeURIComponent(config.url + (config.params ? JSON.stringify(config.params) : ''))
}

// request 一个请求拦截器  在then和catch之前拦截请求和响应。
service.interceptors.request.use(
  config => {
    // console.log('config-pending', pending)
    // 如果想请求可以重复发起，给在请求参数中加allowedRepeat：true  (后续会删除，不会发送给服务端)
    if (!config.allowedRepeat) { // 如果不允许重复请求，开启拦截
      let cancel = null
      config.cancelToken = new axios.CancelToken((c) => {
        cancel = c
      })
      const requestData = getRequestIdentify(config)
      // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
      removePending(requestData, cancel)

      // 使用 cancel token 取消请求 参考：http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8
    } else { // 允许重复请求，不进行拦截
      delete config.allowedRepeat // 把自定义的请求参数给删掉，不发送给服务端
    }
    if (window.sessionStorage.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改,从内存中取得
      config.headers.Authorization = window.sessionStorage.token
    }
    return config
  },
  error => {
    console.log('config-error', error)
    Promise.reject(error)
  }
)

// response interceptor 响应拦截
service.interceptors.response.use(
  res => {
    // console.log('响应拦截', res)
    // 增加延迟，相同请求不得在短时间内重复发送
    setTimeout(() => {
      clearReq(res.config)
    }, 500)
    const { data, config } = res
    // 登录接口先这样，等后端调整了删除关于登录接口的判断
    if (config.url.indexOf('admin/login') !== -1) return data
    // 文件流返回（下载附件等）
    if (data instanceof Blob && config.responseType === 'blob') return data
    if (data.data.code === 1) {
      return data.data
    } else {
      if (config.isToast === false) { // 不需要提示或者自己提示(默认是true)
      } else {
        // console.log('msg',data.message)
        data.message && Message.error(data.message)
      }
      return Promise.reject(data)
    }
  },
  error => {
    if (axios.isCancel(error)) {
      console.warn(error.message)
      // 由于被迫取消请求的响应肯定比response慢，故此处不用清
      // var arr = error.message.split(' ')
      // // clearReq(arr[0])
      // console.log('cancel-pending', pending)
      return Promise.reject(error)
    } else {
      console.log('接口error', error)
      clearReq(error.config)
      if (error.message.match(/timeout/)) {
        Message.error('请求超时,请稍后再试！')
      } else if (error.response.status === 404) {
      // router.push('/404')
      } else if (error.response.status === 500) {
        Message.error('服务器内部错误,请稍后再试！')
      } else if (error.response.status === 502) {
        Message.error('网关超时,请稍后再试！')
      } else {
        Message.error('服务器内部错误,请稍后再试！')
      }
      return Promise.reject(error)
    }
  }
)

export default service
