import axios from '@/utils/request'

// 由于未发现hzwq-auth-axios插件提供的baseURL功能，故在此处理
const baseUrl = 'https://mock.mengxuegu.com/mock/648ffbb097a36459050da413/temp'

// 资料统计
export const getDataStatistics = params => axios.post(baseUrl + '/getDataStatistics', params)

// 资料类别统计
export const getDataTypeStatistics = params => axios.post(baseUrl + '/getDataTypeStatistics', params)

// 资料数量统计
export const getDataNumStatistics = params => axios.post(baseUrl + '/getDataNumStatistics', params)

// 资料趋势统计
export const getDataTrendsStatistics = params => axios.post(baseUrl + '/getDataTrendsStatistics', params)

// 资料详情
export const getDataDetail = params => axios.post(baseUrl + '/getDataDetail', params)
