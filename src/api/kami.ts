/*
 * @Author: your name
 * @Date: 2023-08-21 19:30:54
 * @LastEditTime: 2023-08-22 15:05:54
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-electron/src/api/kami.ts
 */

import axiosReq from 'axios'
import config from './config'
const { baseUrl } = config
export const addKaimi = (subForm) => {
  return axiosReq({
    url: `${baseUrl}/api/v1/generate/authorization/code`,
    params: subForm,
    method: 'get'
  })
}

export const kamiList = () => {
  return axiosReq({
    url: `${baseUrl}/api/v1/query/authorization/code`,
    method: 'get'
  })
}
// 绑定

export const bindAuthCode = (params) => {
  return axiosReq({
    url: `${baseUrl}/api/v1/bind/authorization/code`,
    method: 'get',
    params
  })
}

// 解绑

export const unbindAuthCode = (params) => {
  return axiosReq({
    url: `${baseUrl}/api/v1/unbind/authorization/code`,
    method: 'get',
    params
  })
}
