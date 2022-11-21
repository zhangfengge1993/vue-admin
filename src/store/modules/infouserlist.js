import {
    Message
} from 'element-ui';
export default {
    namespaced: true,
    actions: {

    },
    mutations: {
        // 省市区街道code 状态码
        SET_CITYPICKERCODE(state, data) {
            state.citypickercode = data;
        },
        // select返回值
        SET_SELECTRES(state, data) {
            state.selectres = data;
        }
    },
    state: {
        data: '',
        // 省市区街道code 状态码
        citypickercode: {},
        selectres: {}
    },
    getters: {

    },
}