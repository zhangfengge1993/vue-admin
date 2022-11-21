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
            // 获取用户角色
            // 动态分配路由权限
            // 根据登录时roles来判断有没有设置权限如果roles长度为0则对动态路由进行匹配
            if (store.state.login.roles.length === 0) {
                // 获取用户角色（登录获取权限） api 方法
                store.dispatch('Permissions/roles').then(res => {
                    console.log(res);
                    let role = res.role
                    let buttonPermissions = res.btnPerm 
                    // 将获取到的值传入到登录时roles数组中
                    store.commit('login/SET_ROLES', role)
                    store.commit('login/SET_BUTTON', buttonPermissions)
                    // 调用动态路由函数将获取到的值传入动态路由中进行匹配
                    store.dispatch('Permissions/createRuter', role).then(res => {
                        // let addRouters = store.getters['Permissions/addRouter']
                        // 获取新增加动态路由
                        let addRouters = store.state.Permissions.addRouter
                        // 获取全部路由
                        let allRouters = store.state.Permissions.allRouter
                        // 添加动态路由api 将新增的路由传入到方法中
                        router.addRoutes(addRouters)
                        // 路由更新
                        router.options.routes = allRouters
                        // console.log(router.options.routes);
                        next({
                            ...to,
                            replace: true //不被记录历史记录
                        })
                    })
                })
            } else {
                next()
            }

        }

    } else {
        if ((to.path === '/login')) {
            next()
        } else {
            next('/login')
        }
    }


})