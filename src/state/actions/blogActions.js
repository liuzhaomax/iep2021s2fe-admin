/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/20 15:35
 * @version     v1.0
 * @filename    blogActions.js
 * @description
 ***************************************************************************/

import {BLOG} from "../../config/constants";
import * as blogHandlers from "../../handlers/blogHandlers"

export const setBlog = (blogId, blogPageNum) => {
    return {
        type: BLOG,
        blogId,
        blogPageNum,
    }
}

export const getReqBlogList = path => {
    return dispatch => {
        return {
            promise: blogHandlers.getReqBlogListHandle(path),
            dispatch
        }
    }
}

export const getReqBlog = blogIdPath => {
    return dispatch => {
        return {
            promise: blogHandlers.getReqBlogHandle(blogIdPath),
            dispatch
        }
    }
}

export const postReqBlog = (blogIdPath, data) => {
    return dispatch => {
        return {
            promise: blogHandlers.postReqBlogHandle(blogIdPath, data),
            dispatch
        }
    }
}

export const putReqBlog = (blogIdPath, data) => {
    return dispatch => {
        return {
            promise: blogHandlers.putReqBlogHandle(blogIdPath, data),
            dispatch
        }
    }
}

export const deleteReqBlog = blogIdPath => {
    return dispatch => {
        return {
            promise: blogHandlers.deleteReqBlogHandle(blogIdPath),
            dispatch
        }
    }
}