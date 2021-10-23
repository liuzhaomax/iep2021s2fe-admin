/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/6/27 18:08
 * @version     v1.0
 * @filename    Login.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Login.css"
import bg from "../../assets/cover.jpg"
import LoginBox from "./LoginBox.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../state/actions/loginActions"
// import ripple from "../../utils/ripple";

class Login extends React.Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home")
        } else {
            this.props.loginActions.getPukReq()
                .then(res => {
                    window.sessionStorage.setItem("puk", res.data.puk);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // ripple()
    }

    render() {
        return (
            <div id="login" className="login" style={{backgroundImage:`url(${bg})`}}>
                <LoginBox loginActions={ this.props.loginActions }/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


