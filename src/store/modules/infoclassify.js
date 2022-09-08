import messageapi from "../../api/message"
import {
    Message
} from 'element-ui';
export default {
    namespaced: true,
    actions: {
        // 获取添加一级接口
        async addoneClassify(context, value) {
            const {
                data: res
            } = await messageapi.addoneClassify(value)
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
        // 获取添加子级接口
        async addtowClassify(context, value) {
            const {
                data: res
            } = await messageapi.addtowClassify(value)
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
        // 获取信息分类接口
        async Classify(context, value) {
            const {
                data: res
            } = await messageapi.Classify(value)
            if (res.resCode == 0) {

            } else {
                Message({
                    message: res.message,
                    type: "error",
                });
            }
            return res
        },
        // 删除信息分类接口
        async deleteCategory(context, value) {
            const {
                data: res
            } = await messageapi.deleteCategory(value)
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
        // 修改息分类接口
        async editCategory(context, value) {
            const {
                data: res
            } = await messageapi.editCategory(value)
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
        SET_DATE(state, data) {
            state.data = data;
        }
    },
    state: {
        data: ''
    },
    getters: {

    },
}