/*
 * @Author: your name
 * @Date: 2023-08-21 19:30:54
 * @LastEditTime: 2023-08-21 19:39:06
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
