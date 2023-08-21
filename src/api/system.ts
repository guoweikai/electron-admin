//获取用户信息
import axiosReq from 'axios'
import config from './config'
// export const userInfoReq = (): Promise<any> => {
//   return new Promise((resolve) => {
//     const reqConfig = {
//       url: '/basis-func/user/getUserInfo',
//       params: { plateFormId: 2 },
//       method: 'post'
//     }
//     axiosReq(reqConfig).then(({ data }) => {
//       resolve(data)
//     })
//   })
// }
const { baseUrl } = config
//登录
export const loginReq = (subForm) => {
  return axiosReq({
    url: `${baseUrl}/api/v1/login`,
    data: subForm,
    method: 'post'
  })
}

//退出登录
export const loginOutReq = () => {
  return axiosReq({
    url: '/mock/loginOut',
    method: 'post'
  })
}
