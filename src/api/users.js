import base from "../api/base"
const usersapi = {
    // 获取角色
    role(data) {
        return base.request({
            method: "post",
            url: "/role/",
            data
        })
    },
    // 添加角色
    adduser(data) {
        return base.request({
            method: "post",
            url: "/user/add/",
            data
        })
    },
    // 删除角色
    deleteuser(data) {
        return base.request({
            method: "post",
            url: "/user/delete/",
            data
        })
    },
    // 获取角色列表
    userlist(data) {
        return base.request({
            method: "post",
            url: "/user/getList/",
            data
        })
    },
    // 获取按钮权限
    permButton(data) {
        return base.request({
            method: "post",
            url: "/permButton/",
            data
        })
    },
    // 获取用户禁启用
    useractives(data) {
        return base.request({
            method: "post",
            url: "/user/actives/",
            data
        })
    },
    // 获取用户编辑
    useredit(data) {
        return base.request({
            method: "post",
            url: "/user/edit/",
            data
        })
    },

}
export default usersapi