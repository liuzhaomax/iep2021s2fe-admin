/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/3 1:15
 * @version     v1.0
 * @filename    ErrorBoundary.jsx
 * @description
 ***************************************************************************/

import React from "react"

export default class ErrorBoundary extends React.Component {

    state = {
        hasError: false,
        error: null,
        errorInfo: null
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo
        })
    }

    render() {
        console.log('Error: ', this.state.error)
        console.log(this.state.errorInfo)
        if (this.state.hasError) {
            return (
                <div>
                    { this.props.render('Errors occur when loading.') }
                </div>
            )
        }
        return this.props.children
    }
}
