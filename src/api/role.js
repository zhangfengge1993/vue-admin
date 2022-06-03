import base from "./base"
// 获取菜单权限接口
export function menus(data) {
    return base.request({
        method: "post",
        url: "/system/",
        data
    })
}