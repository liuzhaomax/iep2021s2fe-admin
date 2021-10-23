/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/3 2:27
 * @version     v1.0
 * @filename    loginActions.js
 * @description
 ***************************************************************************/

import * as loginHandlers from "../../handlers/loginHandlers"
import {TOKEN} from "../../config/constants";

export const loginReq = data => {
    return dispatch => {
        return loginHandlers.loginReqHandle(data)
            .then(res => {
                dispatch(setToken(res.data))
                return res
            })
    }
}

export const logoutReq = () => {
    return dispatch => {
        return loginHandlers.logoutReqHandle()
            .then(res => {
                dispatch(setToken(""))
                return res
            })
    }
}

export const getPukReq = () => {
    return dispatch => {
        return loginHandlers.getPukReqHandle()
    }
}

export const setToken = token => {
    return {
        type: TOKEN,
        token
    }
}

export const getPageReq = path => {
    return dispatch => {
        return {
            promise: loginHandlers.getPageReqHandle(path),
            dispatch
        }
    }
}