/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/26 22:39
 * @version     v1.0
 * @filename    SideMenu.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {LaptopOutlined, ReadOutlined, GlobalOutlined, TeamOutlined, AreaChartOutlined} from "@ant-design/icons";
import {Layout, Menu} from "antd";
import "./SideMenu.css"
import {withRouter} from "react-router-dom";
import {WEBSITE_1} from "../config/constants";

const { SubMenu } = Menu
const { Sider } = Layout

class SideMenu extends React.Component {
    jump = e => {
        switch (e.key) {
            case "1":
                this.props.history.push(WEBSITE_1.PATH + WEBSITE_1.MODULE_1.PATH + WEBSITE_1.MODULE_1.FUNCTION_1.PATH)
                break
            case "13":
                this.props.history.push(WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/read/1")
                break
            default:
                console.log("Invalid Menu.Item key.")
        }
    }

    render() {
        return (
            <Sider width={200} className="sider">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[]}
                    defaultOpenKeys={["sub4"]}
                    style={{ height: "100%", borderRight: 0 }}
                >
                    <SubMenu key="sub1" icon={<LaptopOutlined />} title={WEBSITE_1.MODULE_1.NAME}>
                        <Menu.Item key="1" onClick={this.jump}>{WEBSITE_1.MODULE_1.FUNCTION_1.NAME}</Menu.Item>
                        <Menu.Item key="2">{WEBSITE_1.MODULE_1.FUNCTION_2.NAME}</Menu.Item>
                        <Menu.Item key="3">{WEBSITE_1.MODULE_1.FUNCTION_3.NAME}</Menu.Item>
                        <Menu.Item key="4">{WEBSITE_1.MODULE_1.FUNCTION_4.NAME}</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AreaChartOutlined />} title={WEBSITE_1.MODULE_2.NAME}>
                        <Menu.Item key="5">{WEBSITE_1.MODULE_2.FUNCTION_1.NAME}</Menu.Item>
                        <Menu.Item key="6">{WEBSITE_1.MODULE_2.FUNCTION_2.NAME}</Menu.Item>
                        <Menu.Item key="7">{WEBSITE_1.MODULE_2.FUNCTION_3.NAME}</Menu.Item>
                        <Menu.Item key="8">{WEBSITE_1.MODULE_2.FUNCTION_4.NAME}</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<GlobalOutlined />} title={WEBSITE_1.MODULE_3.NAME}>
                        <Menu.Item key="9">{WEBSITE_1.MODULE_3.FUNCTION_1.NAME}</Menu.Item>
                        <Menu.Item key="10">{WEBSITE_1.MODULE_3.FUNCTION_2.NAME}</Menu.Item>
                        <Menu.Item key="11">{WEBSITE_1.MODULE_3.FUNCTION_3.NAME}</Menu.Item>
                        <Menu.Item key="12">{WEBSITE_1.MODULE_3.FUNCTION_4.NAME}</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<ReadOutlined />} title={WEBSITE_1.MODULE_4.NAME}>
                        <Menu.Item key="13" onClick={this.jump}>{WEBSITE_1.MODULE_4.FUNCTION_1.NAME}</Menu.Item>
                        {/*<Menu.Item key="14">{WEBSITE_1.MODULE_4.FUNCTION_2.NAME}</Menu.Item>*/}
                        {/*<Menu.Item key="15">{WEBSITE_1.MODULE_4.FUNCTION_3.NAME}</Menu.Item>*/}
                        {/*<Menu.Item key="16">{WEBSITE_1.MODULE_4.FUNCTION_4.NAME}</Menu.Item>*/}
                    </SubMenu>
                    <SubMenu key="sub5" icon={<TeamOutlined />} title={WEBSITE_1.MODULE_5.NAME}>
                        <Menu.Item key="17">{WEBSITE_1.MODULE_5.FUNCTION_1.NAME}</Menu.Item>
                        <Menu.Item key="18">{WEBSITE_1.MODULE_5.FUNCTION_2.NAME}</Menu.Item>
                        <Menu.Item key="19">{WEBSITE_1.MODULE_5.FUNCTION_3.NAME}</Menu.Item>
                        <Menu.Item key="20">{WEBSITE_1.MODULE_5.FUNCTION_4.NAME}</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(SideMenu)