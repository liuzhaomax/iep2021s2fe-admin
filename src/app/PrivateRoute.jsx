/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/19 18:25
 * @version     v1.0
 * @filename    PrivateRoute.jsx
 * @description
 ***************************************************************************/

import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Login from "../pages/login/Login";
import {notification} from "antd";
import {FrownOutlined} from "@ant-design/icons";
import MainLayout from "../layouts/MainLayout";

class PrivateRoute extends React.Component {

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login")
            notification.open({
                message: 'Need to login',
                description: 'Authentication does not exist or has expired. Please login again.',
                icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login")
            notification.open({
                message: 'Need to login',
                description: 'Authentication does not exist or has expired. Please login again.',
                icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
            })
        }
    }

    render() {
        let { component: Component, ...rest} = this.props;
        return  this.props.auth.isAuthenticated ?
            (<Route {...rest} render={(props) => ( <MainLayout {...props} component={Component}/> )} exact/> )
            : (<Route path="/login" component={ Login } exact/>)
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))