import base from "./base"
const newsapi = {
    // 添加信息
    add(data) {
        return base.request({
            method: "post",
            url: "/news/add/",
            data
        })
    },
    // 获取信息列表
    getList(data) {
        return base.request({
            method: "post",
            url: "/news/getList/",
            data,
            headers:{}
        })
    },
    // 删除信息
    deleteInfo(data) {
        return base.request({
            method: "post",
            url: "/news/deleteInfo/",
            data
        })
    },
    // 修改信息
    editInfo(data) {
        return base.request({
            method: "post",
            url: "/news/editInfo/",
            data
        })
    },
    // 发布状态更新
    status(data) {
        return base.request({
            method: "post",
            url: "/news/status/",
            data
        })
    },
    // 七牛云
    uploadImgToken(data) {
        return base.request({
            method: "post",
            url: "/uploadImgToken/",
            data
        })
    },

}
export default newsapi