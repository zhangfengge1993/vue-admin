import router from "./index"
import store from '../store/index'
import {
    getToken,
    removeToken,
    removeUserName
} from "../reuse/tokenapi"
// 路由守卫根据Token值来验证登陆状态 
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if ((to.path === '/login')) {
            removeToken()
            removeUserName()
            store.commit('login/SET_TOKEN', '')
            store.commit('login/SET_USERNAME', '')
            next()
        } else {
            next()
        }

    } else {
        if ((to.path === '/login')) {
            next()
        } else {
            next('/login')
        }
    }


})