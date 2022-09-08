import loginapi from "../../api/login"
import {
    Message
} from 'element-ui';
import {
    setToken,
    setUserName,
    getUserName,
    removeToken,
    removeUserName
} from "../../reuse/tokenapi"
export default {
    namespaced: true,
    actions: {
        // 获取登录注册验证码
        async loginCode(context, value) {
            const {
                data: res
            } = await loginapi.loginCode(value)
            if (res.resCode == 0) {
                Message({
                    message: res.message,
                    type: "success",
                    duration: 5000,
                });
            } else {
                Message({
                    message: res.message,
                    type: "error",
                });
            }
            return res
        },
        // 登录接口
        async login(context, value) {
            const {
                data: res
            } = await loginapi.login(value)
            context.commit('SET_TOKEN', res.data.token)
            context.commit('SET_USERNAME', res.data.username)
            setToken(res.data.token)
            setUserName(res.data.username)

            if (res.resCode == 0) {
                Message({
                    message: res.message,
                    type: "success",
                });
            } else {
                Message({
                    message: res.message,
                    type: "error",
                });
            }
            return res
        },
        // 注册接口
        async register(context, value) {
            const {
                data: res
            } = await loginapi.register(value)

            if (res.resCode == 200) {
                Message({
                    message: res.message,
                    type: "error",
                });
            } else {
                Message({
                    message: res.message,
                    type: "success",
                });
            }
            return res

        },

    },
    mutations: {
        SET_TOKEN(state, value) {
            state.to_ken = value
        },
        SET_USERNAME(state, value) {
            state.user_name = value
        },
        set_iscollapse(state, value) {
            state.iscollapse = !state.iscollapse

        },
        // 退出
        OUT(state, value) {

            removeUserName()
            removeToken()
            state.to_ken = ''
            state.user_name = ''
        }

    },
    state: {
        // 登陆组册表单
        loginForm: {
            username: "393086316@qq.com",
            password: "zfg111111",
            passwords: "",
            captcha: "",
        },
        // 切换按钮
        items: [{
            item: "登录"
        }, {
            item: "注册"
        }],
        // 登录注册按钮切换
        model: 0,
        to_ken: '',
        user_name: getUserName() || '',
        iscollapse: false,
    },
    getters: {

    },
}