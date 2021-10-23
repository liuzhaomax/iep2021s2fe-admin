/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/4 1:37
 * @version     v1.0
 * @filename    loginHandlers.js
 * @description
 ***************************************************************************/

import axios from "axios";

export const loginReqHandle = data => {
    return axios.post("/login", data,{withCredentials: true})
}

export const getPukReqHandle = () => {
    return axios.get("/login")
}

export const logoutReqHandle = () => {
    return axios.delete( "/logout")
}

export const getPageReqHandle = path => {
    return axios.get(path)
}