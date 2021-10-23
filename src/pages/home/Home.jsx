/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/3 0:42
 * @version     v1.0
 * @filename    Home.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {notification} from "antd";
import {FrownOutlined} from "@ant-design/icons";
import setAuthToken from "../../utils/setAuthToken";
import {bindActionCreators} from "redux";
import * as loginActions from "../../state/actions/loginActions";
import {connect} from "react-redux";

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        const getPageReqObj = this.props.loginActions.getPageReq("/home")
        getPageReqObj.promise
            .then(res => {
                this.setState({data: res.data})
            })
            .catch(err => {
                getPageReqObj.dispatch(this.props.loginActions.setToken(""))
                notification.open({
                    message: 'Need to login',
                    description: 'Authentication does not exist or has expired. Please login again.',
                    icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
                })
                setAuthToken("")
                localStorage.removeItem("TOKEN")
            })
    }

    render() {
        return (
            <div className="Home">
                I am home, {this.state.data}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Home)