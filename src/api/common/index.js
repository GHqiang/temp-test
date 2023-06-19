import axios from '@/utils/request'

// 由于未发现hzwq-auth-axios插件提供的baseURL功能，故在此处理
const baseUrl = 'https://mock.mengxuegu.com/mock/648ffbb097a36459050da413/temp'

// 机构列表树
export const getOrgListTree = params => axios.get(baseUrl + '/getOrgTreeList', { params })
