/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/30 4:16
 * @version     v1.0
 * @filename    DataSource.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {notification, Upload} from 'antd';
import {FrownOutlined, InboxOutlined} from '@ant-design/icons';
import axios from "axios";
import {WEBSITE_1} from "../../config/constants";
import setAuthToken from "../../utils/setAuthToken";
import {bindActionCreators} from "redux";
import * as loginActions from "../../state/actions/loginActions";
import {connect} from "react-redux";

const { Dragger } = Upload;

const upload = () => {
    axios.post(WEBSITE_1.PATH + WEBSITE_1.MODULE_1.PATH + WEBSITE_1.MODULE_1.FUNCTION_1.PATH)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

const props = {
    name: 'file',
    multiple: true,
    accept: '.csv',
    customRequest: upload,
}

class DataSource extends React.Component {

    constructor() {
        super();
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        const getPageReqObj = this.props.loginActions.getPageReq(WEBSITE_1.PATH + WEBSITE_1.MODULE_1.PATH + WEBSITE_1.MODULE_1.FUNCTION_1.PATH)
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
            <div className="DataSource">
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(DataSource)