import {
    MessageBox
} from 'element-ui'
export default {
    install(Vue, Options) {
        // 删除对话框方法
        Vue.prototype.confirm = function (params) {
            MessageBox.confirm(params.text, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true,
                })
                .then(() => {
                    params.fn(params.id || '')
                })
                .catch(() => {
                    params.fncatch()
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        }
    }
}