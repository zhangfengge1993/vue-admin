import base from "./base"
const messageapi = {
    // 获取添加一级接口
    addoneClassify(data) {
        return base.request({
            method: "post",
            url: "/news/addFirstCategory/",
            data
        })
    },
    // 获取添加子级接口
    addtowClassify(data) {
        return base.request({
            method: "post",
            url: "/news/addChildrenCategory/",
            data
        })
    },
    // 获取信息分类
    Classify(data) {
        return base.request({
            method: "post",
            url: "/news/getCategoryAll/",
            data
        })
    },
    // 删除信息分类
    deleteCategory(data) {
        return base.request({
            method: "post",
            url: "/news/deleteCategory/",
            data
        })
    },
    // 删除信息分类
    editCategory(data) {
        return base.request({
            method: "post",
            url: "/news/editCategory/",
            data
        })
    },

}
export default messageapi