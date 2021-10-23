/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/20 15:31
 * @version     v1.0
 * @filename    blog.js
 * @description
 ***************************************************************************/

import {BLOG} from "../../config/constants";

const initialState = {
    blogPageNum: 1,
    blogId: 0,
}

const blog = (state=initialState, action) => {
    switch (action.type) {
        case BLOG:
            return {
                blogPageNum: action.blogPageNum,
                blogId: action.blogId,
            }
        default:
            return state
    }
}

export default blog