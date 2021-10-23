/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/16 5:56
 * @version     v1.0
 * @filename    UpdateArticle.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Blog.css"
import {Button, Input, notification, message} from "antd";
import Editor from "./SlateEditor/Editor";
import {FrownOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import * as blogActions from "../../state/actions/blogActions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {WEBSITE_1} from "../../config/constants";

class UpdateArticle extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {
                blogId: undefined,
                blogTitle: undefined,
                blogAuthor: undefined,
                blogReference: undefined,
                blogLink: undefined,
                blogPreview: "",
                blogContent: [
                    {
                        type:"paragraph",
                        children:[
                            {
                                text: ""
                            }
                        ],
                    },
                ],
            },
        }
    }

    componentDidMount() {
        if (this.props.location.pathname.split("/").slice(-1)[0] !== "create"
        && this.props.location.pathname.split("/").slice(-2)[0] !== "create") {
            this.getBlog()
        }
    }

    getBlog = () => {
        let blogId = this.props.location.pathname.split("/").slice(-1)[0] ?
            this.props.location.pathname.split("/").slice(-1)[0]
            :
            this.props.location.pathname.split("/").slice(-2)[0]
        const getReqBlogObj = this.props.blogActions.getReqBlog(
            WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/update/" + blogId
        )
        getReqBlogObj.promise
            .then(res => {
                this.setState({
                    data: {
                        blogId: res.data.blogId,
                        blogTitle: res.data.blogTitle,
                        blogAuthor: res.data.blogAuthor,
                        blogReference: res.data.blogReference,
                        blogLink: res.data.blogLink,
                        blogContent: JSON.parse(res.data.blogContent),
                    }
                })
            })
            .catch(err => {
                message.error("Loading the blog failed.");
                notification.open({
                    message: "Loading Failed",
                    description: "Unexpected loading issue. Please refresh and load again.",
                    icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
                })
            })
    }

    prepareData = (previewWordsNum) => {
        let data = this.state.data
        let paragraph
        let imgUrl
        let flagText = false
        let flagImg = false
        for (let i = 0; i < data.blogContent.length; i++) {
            if (data.blogContent[i].type === "paragraph" && !flagText) {
                paragraph = data.blogContent[i].children[0].text
                flagText = true
                continue
            }
            if (data.blogContent[i].type === "image" && !flagImg) {
                imgUrl = data.blogContent[i].url
                flagText = true
            }
            if (flagText && flagImg) {
                break
            }
        }
        let text = paragraph.split("\n").join(" ")
        text = text.split(" ").slice(0, previewWordsNum).join(" ")
        data.blogPreview = text
        data.blogPreviewImg = imgUrl
        data.blogContent = JSON.stringify(data.blogContent)
        return data
    }

    isEmpty = (data) => {
        if (!data.blogTitle) {
            this.savingFailedMsg("title")
            return true
        } else if (!data.blogAuthor) {
            this.savingFailedMsg("author")
            return true
        } else if (!data.blogReference) {
            this.savingFailedMsg("reference")
            return true
        } else if (!data.blogLink) {
            this.savingFailedMsg("original link")
            return true
        } else if (!data.blogContent) {
            this.savingFailedMsg("content")
            return true
        }
        return false
    }

    savingFailedMsg = (field) => {
        message.error("Saving the blog failed.")
        notification.open({
            message: "Saving Failed",
            description: "The blog " + field + " should not be empty.",
            icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
        })
    }

    onClickSave = () => {
        let blogId = this.props.location.pathname.split("/").slice(-1)[0] ?
            this.props.location.pathname.split("/").slice(-1)[0]
            :
            this.props.location.pathname.split("/").slice(-2)[0]
        let data = this.prepareData(50)
        if (!this.isEmpty(data)) {
            if (this.props.location.pathname.split("/").slice(-1)[0] !== "create") {
                const putReqBlogObj = this.props.blogActions.putReqBlog(
                    WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/update/" + blogId,
                    data
                )
                putReqBlogObj.promise
                    .then(res => {
                        message.success("Updating the blog succeeded.")
                    })
                    .catch(err => {
                        message.error("Updating the blog failed.")
                        notification.open({
                            message: "Updating Failed",
                            description: "Unexpected updating issue. Please refresh and save again.",
                            icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
                        })
                    })
            } else {
                const postReqBlogObj = this.props.blogActions.postReqBlog(
                    WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/create",
                    data
                )
                postReqBlogObj.promise
                    .then(res => {
                        message.success("Creating the blog succeeded.")
                    })
                    .catch(err => {
                        message.error("Creating the blog failed.")
                        notification.open({
                            message: "Creating Failed",
                            description: "Unexpected creating issue. Please refresh and save again.",
                            icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
                        })
                    })
            }
            this.props.history.goBack()
        }
    }

    onClickCancel = () => {
        this.props.history.goBack()
    }

    onChange = (e, key) => {
        let data = this.state.data
        data[key] = e.target.value
        this.setState({data: data})
    }

    getContent = (content) => {
        let data = this.state.data
        data.blogContent = content
        this.setState({data: data})
    }

    render() {
        return (
            <div className="UpdateArticle" id="UpdateArticle">
                <h3>Title</h3>
                <Input
                    placeholder="Please type the title of the article."
                    className="blog-update-input"
                    value={this.state.data.blogTitle}
                    onChange={e => this.onChange(e, "blogTitle")}
                />
                <h3>Author</h3>
                <Input
                    placeholder="Please type the author(s) of the article."
                    className="blog-update-input"
                    value={this.state.data.blogAuthor}
                    onChange={e => this.onChange(e, "blogAuthor")}
                />
                <h3>Reference</h3>
                <Input
                    placeholder="Please type the reference(s) of the article."
                    className="blog-update-input"
                    value={this.state.data.blogReference}
                    onChange={e => this.onChange(e, "blogReference")}
                />
                <h3>Original Link</h3>
                <Input
                    placeholder="Please type the original link of the article."
                    className="blog-update-input"
                    value={this.state.data.blogLink}
                    onChange={e => this.onChange(e, "blogLink")}
                />
                <h3>Content</h3>
                <div className="blog-update-editor">
                    <Editor content={this.state.data.blogContent} getContent={this.getContent}/>
                </div>
                <div className="blog-update-btn-container">
                    <Button className="blog-update-btn" id="blog-update-btn-save" onClick={this.onClickSave} type="primary">Save</Button>
                    <Button className="blog-update-btn" id="blog-update-btn-cancel" onClick={this.onClickCancel}>Cancel</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        blog: state.blog
    }
}

const mapDispatchToProps = dispatch => {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateArticle))