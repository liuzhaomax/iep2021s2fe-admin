/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/27 22:45
 * @version     v1.0
 * @filename    MainLayout.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {Layout} from 'antd';
import "./MainLayout.css";
import Nav from "./Nav";
import SideMenu from "./SideMenu";
import CenterContent from "./CenterContent";

class MainLayout extends React.Component {
    render() {
        return (
            <Layout className="Layout">
                <Nav defaultSelectedKeys={['1']}/>
                <Layout style={{'height': '93.5vh'}}>
                    <SideMenu/>
                    <CenterContent component={this.props.component}/>
                </Layout>
            </Layout>
        )
    }
}

export default MainLayout

