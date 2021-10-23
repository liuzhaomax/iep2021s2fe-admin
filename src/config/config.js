/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/4 1:51
 * @version     v1.0
 * @filename    config.js
 * @description
 ***************************************************************************/

import configJson from "../config/config.json"

const config = {
    domain: configJson.http.domain,
    beDomain: configJson.be.domain,
    beBaseUrl: configJson.run_mode === "release" ?
        `${configJson.be.protocol}://${configJson.be.domain}` :
        `${configJson.be.protocol}://${configJson.be.local_host}:${configJson.be.port}`,
    feBaseUrl: configJson.run_mode === "release" ?
        `${configJson.fe.protocol}://${configJson.fe.domain}` :
        `${configJson.fe.protocol}://${configJson.fe.local_host}:${configJson.fe.port}`,
}
export default config