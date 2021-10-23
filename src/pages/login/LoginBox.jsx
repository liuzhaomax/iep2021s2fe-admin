/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/6/28 19:34
 * @version     v1.0
 * @filename    LoginBox.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Login.css"
import {Button, Input, message, notification} from "antd"
import {EyeInvisibleOutlined, EyeTwoTone, FrownOutlined} from "@ant-design/icons"
import { withRouter } from "react-router-dom"
import md5 from "md5"
import JsEncrypt from "jsencrypt";
import setAuthToken from "../../utils/setAuthToken";

class LoginBox extends React.Component {

    constructor() {
        super()
        this.state = {
            user_email: "",
            user_password: "",
            isLoading: false
        }
    }

    encrypt = () => {
        let rsa = new JsEncrypt()
        rsa.setPublicKey(sessionStorage.getItem("puk"))
        return {
            "user_email": rsa.encrypt(this.state.user_email),
            "user_password": rsa.encrypt(md5(this.state.user_password))
        }
    }

    submit = (e) => {
        this.setState({isLoading: true})
        this.props.loginActions.loginReq(this.encrypt())
            .then(res => {
                this.setState({isLoading: false})
                setAuthToken(res.data)
                localStorage.setItem("TOKEN", res.data)
                message.success("Login Succeeded.")
                this.props.history.push("/home")
            })
            .catch(err => {
                this.setState({isLoading: false})
                message.error("Login Failed.")
                notification.open({
                    message: 'Login Failed',
                    description: 'Please check your input email and password.',
                    icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
                })
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    cancelBubble = e => {
        e.stopPropagation()
    }

    render() {
        return (
            <div className="login-box" onClick={this.cancelBubble}>
                <div className="login-box-content">
                    <div id="login-box-first-line">
                        <h1>Login</h1>
                        <div id="login-logo"/>
                    </div>
                    <Input
                        id="login-user-email"
                        name="user_email"
                        placeholder="Please input your email."
                        value={ this.state.user_email }
                        onPressEnter={ this.submit }
                        onChange={ this.onChange }
                    />
                    <Input.Password
                        id="login-user-password"
                        name="user_password"
                        placeholder="Please input your password."
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value={ this.state.user_password }
                        onPressEnter={ this.submit }
                        onChange={ this.onChange }
                    />
                    <Button id="btn-login" type="primary" onClick={ this.submit } loading={ this.state.isLoading }>Login</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginBox)