<template>
  <div>
    <el-select v-model="formUser.IDvalue" class="infoinp2" @change="resdata">
      <el-option
        v-for="item in formUser.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["config"],
  data() {
    // 这里存放数据
    return {
      formUser: {
        // options: [],
        options: [
          {
            value: "name",
            label: "姓名",
          },
          {
            value: "phone",
            label: "手机号",
          },
        ],
        // 搜索
        UserSearch: "",
        // 关键字
        IDvalue: "",
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getConfigOption();
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
    getConfigOption() {
      //   let option = [];
      //   this.config.forEach((item) => {
      //     let arr = this.formUser.options1.filter((elem) => {
      //       return elem.value == item;
      //     });
      //     option.push(arr[0]);
      //   });

      this.formUser.options = this.config;
    },
    resdata(val) {
      let arr = this.formUser.options;
      let opdata = arr.filter((item) => {
        return item.value == val;
      })[0];
      this.$store.commit("infouserlist/SET_SELECTRES", opdata);
      // console.log(this.$store.state.infouserlist.selectres);
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
