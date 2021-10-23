/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/20 23:58
 * @version     v1.0
 * @filename    blogHandlers.js
 * @description
 ***************************************************************************/

import axios from "axios";

export const getReqBlogListHandle = path => {
    return axios.get(path)
}

export const getReqBlogHandle = blogIdPath => {
    return axios.get(blogIdPath)
}

export const postReqBlogHandle = (blogIdPath, data) => {
    return axios.post(blogIdPath, data)
}

export const putReqBlogHandle = (blogIdPath, data) => {
    return axios.put(blogIdPath, data)
}

export const deleteReqBlogHandle = blogIdPath => {
    return axios.delete(blogIdPath)
}