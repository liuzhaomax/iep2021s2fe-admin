/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/15 21:40
 * @version     v1.0
 * @filename    BlogList.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Blog.css"
import {Button, List, Avatar, Space, notification} from "antd";
import {EditOutlined, BulbOutlined, EyeOutlined, FrownOutlined} from "@ant-design/icons";
import avatar from "../../assets/article.svg"
import {WEBSITE_1} from "../../config/constants";
import {withRouter} from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import {bindActionCreators} from "redux";
import * as loginActions from "../../state/actions/loginActions";
import * as blogActions from "../../state/actions/blogActions";
import {connect} from "react-redux";
import DeleteDialog from "./DeleteDialog";
import example from "../../assets/example.jpg"
import config from "../../config/config";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
)

class BlogList extends React.Component {

    constructor() {
        super();
        this.state = {
            data: undefined,
            pageNum: 1,
            getBlogListReqObj: undefined,
        }
    }

    componentDidMount() {
        let pageNum = this.props.location.pathname.split("/").slice(-1)[0] ?
            this.props.location.pathname.split("/").slice(-1)[0]
            :
            this.props.location.pathname.split("/").slice(-2)[0]
        this.setState({
            pageNum: Number(pageNum)
        })
        this.getBlogList()
    }

    getBlogList = () => {
        const getBlogListReqObj = this.props.blogActions.getReqBlogList(
            WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/read/1"
        )
        this.setState({
            getBlogListReqObj,
        })
        getBlogListReqObj.promise
            .then(res => {
                let listData = []
                for (let i = 0; i < res.data.length; i++) {
                    listData.push({
                        blogId: res.data[i].blogId,
                        href: config.feBaseUrl + WEBSITE_1.MODULE_4.PATH + "/article/" + res.data[i].blogId,
                        blogTitle: res.data[i].blogTitle,
                        avatar: avatar,
                        blogAuthor: "by " + res.data[i].blogAuthor,
                        blogPreview: res.data[i].blogPreview,
                        blogPreviewImg: res.data[i].blogPreviewImg,
                        blogView: res.data[i].blogView,
                        blogCreateTime: res.data[i].blogCreateTime,
                        blogUpdateTime: res.data[i].blogUpdateTime,
                    })
                }
                this.setState({data: listData})
            })
            .catch(err => {
                getBlogListReqObj.dispatch(this.props.loginActions.setToken(""))
                notification.open({
                    message: 'Need to login',
                    description: 'Authentication does not exist or has expired. Please login again.',
                    icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
                })
                setAuthToken("")
                localStorage.removeItem("TOKEN")
            })
    }

    onClickCreate = () => {
        this.props.history.push(WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/create")
    }

    onClickEdit = item => {
        this.state.getBlogListReqObj.dispatch(blogActions.setBlog(item.blogId, this.state.pageNum))
        this.props.history.push(WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/update/" + item.blogId)
    }

    transformDate = dateStd => {
        let date = new Date(dateStd)
        let datee = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        return `${datee}-${month}-${year} ${hours}:${minutes}`
    }

    onRef = (ref) => {
        this.showModal = ref
    }

    popupDeleteDialog = item => {
        this.showModal(item)
    }

    render() {
        return (
            <div className="BlogList" id="BlogList">
                <Button type="primary" onClick={this.onClickCreate}>Create Article</Button>
                <List
                    id="blog-list"
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        current: this.state.pageNum,
                        onChange: page => {
                            this.setState({
                                pageNum: page,
                            })
                            this.state.getBlogListReqObj.dispatch(blogActions.setBlog(0, page))
                            this.props.history.push(
                                WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH +
                                "/read/" + page
                            )
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.state.data}
                    footer={
                        <div>
                            {/*<b>footer</b> footer part*/}
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            className="blog-list-item"
                            key={item.blogTitle}
                            actions={[
                                <IconText icon={EyeOutlined} text={item.blogView} key="list-vertical-view" />,
                                <IconText icon={EditOutlined} text={this.transformDate(item.blogCreateTime)} key="list-vertical-create" />,
                                <IconText icon={BulbOutlined} text={this.transformDate(item.blogUpdateTime)} key="list-vertical-update" />,
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                <a key="list-vertical-edit" onClick={this.onClickEdit.bind(this, item)}>edit</a>,
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                <a key="list-vertical-delete" onClick={this.popupDeleteDialog.bind(this, item)}>delete</a>,
                            ]}
                            extra={
                                <img
                                    height={170}
                                    alt="blog-preview-img"
                                    src={item.blogPreviewImg ?
                                        item.blogPreviewImg
                                        :
                                        example
                                    }
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href} target="view_window">{item.blogTitle}</a>}
                                description={item.blogAuthor}
                            />
                            {item.blogPreview}
                        </List.Item>
                    )}
                />
                <DeleteDialog
                    onRef={this.onRef}
                    blogActions={this.props.blogActions}
                    pathname={this.props.location.pathname}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        blogActions: bindActionCreators(blogActions, dispatch),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(BlogList))