import base from "../api/base"
const requesUrlapi = {
    userlist(params) {
        return base.request({
            method: params.method || "post",
            url: params.url,
            data: params.data || {}

        })
    },
    // 省市区街道公共接口
    cityPicker(data) {
        return base.request({
            method: "post",
            url: "/cityPicker/",
            data
        })
    },
}
export default requesUrlapi