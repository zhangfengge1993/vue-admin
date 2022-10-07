import {
    Message
} from 'element-ui';
import newsapi from "../../api/news"
export default {
    namespaced: true,
    actions: {
        // 七牛云接口
        async newsstatus(context, value) {
            const {
                data: res
            } = await newsapi.uploadImgToken(value)
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
        SET_DATE(state, value) {
            state.infodetailsData = value;
            sessionStorage.setItem('infodetailsData', JSON.stringify(value))
        }
    },
    state: {
        infodetailsData: '' || JSON.parse(sessionStorage.getItem('infodetailsData'))
    },
    getters: {

    },
}