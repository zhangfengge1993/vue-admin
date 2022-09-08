import base from "../api/base"
const loginapi = {
    // 获取验证码登录注册接口
    loginCode(data) {
        return base.request({
            method: "post",
            url: "/getSms/",
            data
        })
    },
    // 获取注册接口
    register(data) {
        return base.request({
            method: "post",
            url: "/register/",
            data
        })
    },
    // 获取登陆接口
    login(data) {
        return base.request({
            method: "post",
            url: "/login/",
            data
        })
    },
}
export default loginapi

