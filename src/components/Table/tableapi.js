import requesUrlapi from "../../api/requesUrl";
const tableMethods = {
    userlist: [],
    // 初始化table配置项
    getConfigTable(params) {
        let configdata = this.config;
        let keys = Object.keys(this.configTablelist); //es6获取对象key名的方法
        for (let key in configdata) {
            //includes(key)
            if (keys.includes(key)) {
                this.configTablelist[key] = configdata[key];
            }
        }
    },
    // 获取数据地址
    async getdatalist(params) {
        let requesJsondata = params;
        let userlistdata = {
            url: requesJsondata.url,
            method: requesJsondata.method,
            data: requesJsondata.data,
        };
        try {
            const {
                data: res
            } = await requesUrlapi.userlist(userlistdata);
            return this.userlist = res.data.data;

        } catch (err) {
            console.log(err);
        }
    },
}
export default tableMethods