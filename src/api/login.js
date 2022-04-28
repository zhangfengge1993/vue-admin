import base from "./base"
// 获取验证码登录注册接口
export function loginCode(data) {
    return base.request({
        method: "post",
        url: "/getSms/",
        data
    })
}

// 获取注册接口
export function register(data) {
    return base.request({
        method: "post",
        url: "/register/",
        data
    })
}
// 获取登陆接口
export function login(data) {
    return base.request({
        method: "post",
        url: "/login/",
        data
    })
}