/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/3 0:15
 * @version     v1.0
 * @filename    routes.jsx
 * @description
 ***************************************************************************/

import React from "react"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import NotFoundRoute from "./NotFoundRoute";
import NotFound from "../pages/notFound/NotFound"
import Index from "../pages/index/Index"
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import DataSource from "../pages/plantHub/DataSource";
import BlogList from "../pages/blog/BlogList"
import UpdateArticle from "../pages/blog/UpdateArticle";
import {WEBSITE_1} from "../config/constants";

export default (
    <Switch>
        <Route path="/" component={ Index } exact/>
        <Route path="/login" component={ Login } exact/>
        <PrivateRoute path="/home" component={ Home } exact/>
        <PrivateRoute path={WEBSITE_1.PATH + WEBSITE_1.MODULE_1.PATH + WEBSITE_1.MODULE_1.FUNCTION_1.PATH} component={ DataSource } exact/>
        <PrivateRoute path={WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/read/:pagenum"} component={ BlogList } exact/>
        <PrivateRoute path={WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/create"} component={ UpdateArticle } exact/>
        <PrivateRoute path={WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/update/:id"} component={ UpdateArticle } exact/>
        <NotFoundRoute component={ NotFound }/>
    </Switch>
)