/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/26 22:39
 * @version     v1.0
 * @filename    CenterContent.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {Breadcrumb, Layout} from "antd";
import {WEBSITE_1} from "../config/constants";
import "./CenterContent.css"
import { flatten } from "../utils/array";
import {withRouter} from "react-router-dom";

const { Content } = Layout

class CenterContent extends React.Component {

    findNameByPath = (obj, value) => {
        let result = []
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === value) {
                    result.push(obj)
                    return flatten(result)
                }
                if (obj[key] instanceof Object) {
                    result.push(this.findNameByPath(obj[key], value))
                }
            }
        }
        return flatten(result)
    }

    getBreadcrumbNameArray = (obj, value) => {
        let pathArr = value.split("/").slice(1).map(elem => "/" + elem)
        let result = []
        if (value !== "/home" && value !== "/home/" ) {
            let func = this.findNameByPath(obj, pathArr[2])
            let modu = this.findNameByPath(obj, pathArr[1])
            let webs = this.findNameByPath(obj, pathArr[0])
            result.push(webs[0]['NAME'])
            result.push(modu[0]['NAME'])
            result.push(func[0]['NAME'])
        }
        return result
    }

    jumpToHome = () => {
        this.props.history.push("/home")
    }

    render() {
        let breadcrumbNameArray = this.getBreadcrumbNameArray(WEBSITE_1, this.props.location.pathname)
        let { component: Component } = this.props
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    {
                        this.props.location.pathname !== "/home" ?
                        <React.Fragment>
                            <Breadcrumb.Item className="bc-home" onClick={this.jumpToHome}>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>{breadcrumbNameArray[0]}</Breadcrumb.Item>
                            <Breadcrumb.Item>{breadcrumbNameArray[1]}</Breadcrumb.Item>
                            <Breadcrumb.Item>{breadcrumbNameArray[2]}</Breadcrumb.Item>
                        </React.Fragment>
                        :
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    }
                </Breadcrumb>
                <Content className="content">
                    <Component />
                </Content>
            </Layout>
        )
    }
}

export default withRouter(CenterContent)