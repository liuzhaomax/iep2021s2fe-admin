/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/21 22:51
 * @version     v1.0
 * @filename    NotFoundRoute.jsx
 * @description
 ***************************************************************************/

import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Login from "../pages/login/Login";

class NotFoundRoute extends React.Component {
    render() {
        let { component: Component, ...rest} = this.props;
        return  this.props.auth.isAuthenticated ?
            (<Route {...rest} render={(props) => ( <Component {...props} /> )} exact/> )
            : (<Route path="/login" component={ Login } exact/>)
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(withRouter(NotFoundRoute))
