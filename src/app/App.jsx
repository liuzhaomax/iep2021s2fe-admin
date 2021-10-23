/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/6/27 17:21
 * @version     v1.0
 * @filename    App.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./App.css"
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes"
import setAuthToken from "../utils/setAuthToken";
import {setToken} from "../state/actions/loginActions";

export default class App extends React.Component {
    render() {
        let token = localStorage.getItem("TOKEN")
        if (token) {
            setAuthToken(token)
            this.props.store.dispatch(setToken(token))
        }
        return (
            <div className="app">
                <Router>
                    { routes }
                </Router>
            </div>
        )
    }
}
