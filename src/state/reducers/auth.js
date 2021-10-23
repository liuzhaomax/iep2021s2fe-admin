/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/2 21:07
 * @version     v1.0
 * @filename    auth.js
 * @description
 ***************************************************************************/

import {TOKEN} from "../../config/constants";
import isEmpty from "lodash/isEmpty"

const initialState = {
    isAuthenticated: false,
    token: ""
}

const auth = (state=initialState, action) => {
    switch (action.type) {
        case TOKEN:
            return {
                isAuthenticated: !isEmpty(action.token),
                token: action.token
            }
        default:
            return state
    }
}

export default auth