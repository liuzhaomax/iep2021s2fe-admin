/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/26 22:34
 * @version     v1.0
 * @filename    Nav.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {Layout, Menu, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import "./Nav.css"
import {WEBSITE_1} from "../config/constants";
import {bindActionCreators} from "redux";
import * as loginActions from "../state/actions/loginActions";
import {connect} from "react-redux";
import setAuthToken from "../utils/setAuthToken";
import {withRouter} from "react-router-dom";

const { Header } = Layout;

class Nav extends React.Component {

    logout = () => {
        this.props.loginActions.logoutReq()
            .then(res => {
                setAuthToken("")
                localStorage.removeItem("TOKEN")
                message.success("Logout Succeeded.")
            })
            .catch(err => {
                message.success("Logout Failed.")
                console.log(err)
            })
    }

    jumpToHome = () => {
        this.props.history.push("/home")
    }

    render() {
        return (
            <Header className="header">
                <div className="logo" onClick={this.jumpToHome}/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={this.props.defaultSelectedKeys}>
                    <Menu.Item className="nav" key="1">{WEBSITE_1.NAME}</Menu.Item>
                    {/*<Menu.Item className="nav" key="2">Website 2</Menu.Item>*/}
                    {/*<Menu.Item className="nav" key="3">Users</Menu.Item>*/}
                </Menu>
                <div className="profile">
                    <UserOutlined className="profile-icon"/>
                </div>
                <div className="logout" onClick={this.logout}>Logout</div>
            </Header>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Nav))