import loginapi from "../../api/login"
import {
    defaultRouter,
    asynsRouter,

} from "../../router/index"
import {
    Message
} from 'element-ui';
// 路由过滤函数如果能查到router.meta.roles设置的字段名则返回true
function hasPermissions(role, router) {
    // 根据获取的接口字段名进行路由过滤匹配
    if (router.meta && router.meta.roles) {
        // 字段名过滤
        return role.some((item) => {
            // 如果能够查到router.meta.roles的字段名跟获取的接口名 indexof()方法 返回大于0以上的值  则返回true
            // 如果小于0以下则没有该字段名 则返回false
            return router.meta.roles.indexOf(item) >= 0
        })
        return role.some(item => router.meta.roles.indexOf(item) >= 0)

    }

}
export default {
    namespaced: true,

    actions: {
        // 权限接口
        async roles(context, value) {
            const {
                data: res
            } = await loginapi.roles(value)
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
            let roles = res.data
            return roles
        },
        // 创建动态路由
        async createRuter(context, value) {
            let role = value
            let addRouters = []
            // 超管状态
            // 如果是超级管理员直接把动态路由加入到全部路由里面
            if (role.includes('admin')) {
                addRouters = asynsRouter
            } else {
                // 如果不是超级管理员则进入普通管理员中进行塞选过滤
                addRouters = asynsRouter.filter((item) => {

                    // 根据条件调用过滤函数 hasPermissions方法 将获取的权限列表进行路由匹配 条件成立则返回相应的路由 item
                    if (hasPermissions(role, item)) {
                        if (item.children && item.children.length > 0) {
                            item.children = item.children.filter(child => {
                                if (hasPermissions(role, child)) {
                                    return child
                                }
                            })
                            // return item
                        }
                        return item
                    }
                })
            }
            // 调用设置路由函数
            context.commit('SET_ROUTERS', addRouters)

        }
    },
    mutations: {

        SET_ROUTERS(state, value) {
            // 将参数传入到添加路由当中
            state.addRouter = value
            // 将添加的路由与全部路由进行拼接
            state.allRouter = defaultRouter.concat(state.addRouter)
        }

    },
    state: {
        // 添加动态路由
        addRouter: [],
        // 全部路由+加入默认的路由
        allRouter: defaultRouter
    },
    getters: {
        // addRouter: state => state.addRouter,
        // allRouter: state => state.allRouter
    },
}