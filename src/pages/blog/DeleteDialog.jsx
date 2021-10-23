/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/24 4:49
 * @version     v1.0
 * @filename    DeleteDialog.jsx
 * @description
 ***************************************************************************/

import React, {useState, useEffect} from "react"
import {message, Modal, notification} from "antd"
import {WEBSITE_1} from "../../config/constants";
import {FrownOutlined} from "@ant-design/icons";
import "./Blog.css"

const DeleteDialog = props => {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState("")
    const [blogId, setBlogId] = useState(0)

    useEffect(() => {
        props.onRef(showModal)
    })

    const showModal = (item) => {
        setBlogId(item.blogId)
        setModalText(item.blogTitle)
        setVisible(true)
    }

    const handleOk = () => {
        setModalText("Deleting ...")
        setConfirmLoading(true)
        const deleteReqBlogObj = props.blogActions.deleteReqBlog(
            WEBSITE_1.PATH + WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/delete/" + blogId
        )
        deleteReqBlogObj.promise
            .then(res => {
                message.success("Deleting the blog succeeded.")
                setVisible(false)
                setConfirmLoading(false)
            })
            .catch(err => {
                message.error("Deleting the blog failed.")
                notification.open({
                    message: "Deleting Failed",
                    description: "Unexpected deleting issue. Please refresh and delete again.",
                    icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
                })
                setVisible(false)
                setConfirmLoading(false)
            })
        window.location.replace(props.pathname)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <Modal
            title="Deleting Blog"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>Are you sure you want to delete the blog: </p>
            <p>"<span style={{color: "#338e6c", fontWeight: "bold"}}>{modalText}</span>"</p>
        </Modal>
    )
}

export default DeleteDialog