/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/2 21:08
 * @version     v1.0
 * @filename    index.js
 * @description
 ***************************************************************************/

import { combineReducers } from "redux"
import auth from "./auth"
import blog from "./blog"

const rootReducer = combineReducers({
    auth,
    blog,
})

export default rootReducer