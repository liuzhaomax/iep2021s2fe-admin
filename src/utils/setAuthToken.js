/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/7 19:49
 * @version     v1.0
 * @filename    setAuthToken.js
 * @description
 ***************************************************************************/

import axios from "axios";

const setAuthToken = token => {
    if (token) {
        axios.defaults.withCredentials = true
        axios.defaults.headers.common['Authorization'] = token
    } else {
        axios.defaults.withCredentials = false
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken