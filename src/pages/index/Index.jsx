/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/25 5:42
 * @version     v1.0
 * @filename    Index.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"

class Index extends React.Component {
    render() {
        return (
            <React.Fragment>
                {
                   this.props.isAuthenticated ?
                       <Redirect to="/home"/> :
                       <Redirect to="/login"/>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, null)(Index)
