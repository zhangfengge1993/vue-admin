import newsapi from "../../api/news"
import {
    Message
} from 'element-ui';
export default {
    namespaced: true,
    actions: {
        // 获取添加信息接口
        async newsadd(context, value) {
            const {
                data: res
            } = await newsapi.add(value)
            if (res.resCode == 0) {
                Message({
                    message: res.message,
                    type: "success",
                    duration: 1000,
                });
            } else {
                Message({
                    message: res.message,
                    type: "error",
                });
            }
            return res
        },
        // 获取信息列表接口
        async newsgetList(context, value) {
            const {
                data: res
            } = await newsapi.getList(value)
            if (res.resCode == 0) {

            } else {
                Message({
                    message: res.message,
                    type: "error",
                });
            }
            return res
        },
        // 删除信息接口
        async newsdeleteInfo(context, value) {
            const {
                data: res
            } = await newsapi.deleteInfo(value)
            if (res.resCode == 0) {
                Message({
                    message: res.message,
                    type: "success",
                    duration: 1000,
                });
            } else {
                Message({
                    message: res.message,
                    type: "error",
                });
            }
            return res
        },
        // 修改信息接口
        async newseditInfo(context, value) {
            const {
                data: res
            } = await newsapi.editInfo(value)
            if (res.resCode == 0) {
                Message({
                    message: res.message,
                    type: "success",
                    duration: 1000,
                });
            } else {
                Message({
                    message: res.message,
                    type: "error",
                });
            }
            return res
        },
        // 发布状态更新接口
        async newsstatus(context, value) {
            const {
                data: res
            } = await newsapi.status(value)
            if (res.resCode == 0) {
                Message({
                    message: res.message,
                    type: "success",
                    duration: 1000,
                });
            } else {
                Message({
                    message: res.message,
                    type: "error",
                });
            }
            return res
        },
    },
    mutations: {

    },
    state: {

    },
    getters: {

    },
}