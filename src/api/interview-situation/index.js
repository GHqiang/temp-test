import axios from '@/utils/request'

// 由于未发现hzwq-auth-axios插件提供的baseURL功能，故在此处理
const baseUrl = 'https://mock.mengxuegu.com/mock/648ffbb097a36459050da413/temp'

// 面试情况列表
export const getInterviewSituationList = params => axios.post(baseUrl + '/getInterviewSituationList', params)

// 保存邀约跟踪
export const saveInviteTrack = params => axios.post(baseUrl + '/saveInviteTrack', params)
