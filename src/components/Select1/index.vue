<template>
  <div>
    <el-col :span="spanw"
      ><el-select
        v-model="IDvalue"
        @change="zfgselectdata"
        @focus="configdata()"
      >
        <el-option
          v-for="(item, index) in ConfigSelectData.data"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option> </el-select
    ></el-col>
  </div>
</template>

<script>
import requesUrlapi from "../../api/requesUrl";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["config"],
  data() {
    // 这里存放数据
    return {
      IDvalue: "",
      spanw: "",
      ConfigSelectData: {
        status: true,
        // 请求地址
        requesData: {},
        data: [],
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getConfigSelect();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    // 初始化Select配置项
    getConfigSelect() {
      let configdata = this.config;
      this.spanw = this.config.spanw;
      let keys = Object.keys(this.ConfigSelectData); //es6获取对象key名的方法
      for (let key in configdata) {
        //includes(key)
        if (keys.includes(key)) {
          this.ConfigSelectData[key] = configdata[key];
        }
      }
    },
    // 获取省份数据地址
    async getprovincelist() {
      let requesJsondata = this.ConfigSelectData.requesData;
      let userlistdata = {
        url: requesJsondata.url,
        method: requesJsondata.method,
        data: requesJsondata.data,
      };
      try {
        const { data: res } = await requesUrlapi.userlist(userlistdata);
        let arrlist = res.data.data;
        arrlist.forEach((item) => {
          let keys = Object.keys(item); //es6获取对象key名的方法
          this.ConfigSelectData.data.push({
            value: item[keys[0]],
            label: item[keys[2]],
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
    zfgselectdata() {
      this.$emit("selectdata", {
        IDvalue: this.IDvalue,
      });
    },
    configdata() {
      this.getprovincelist();
      this.ConfigSelectData.data = [];
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
