<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6" v-if="infoProvinces.province"
        ><el-select v-model="Idcode.provinceCode" @change="getCitylist">
          <el-option
            v-for="item in configcityPicker.province"
            :key="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
            :value="item.PROVINCE_CODE"
          >
          </el-option> </el-select
      ></el-col>

      <el-col :span="5" v-if="infoProvinces.city"
        ><el-select v-model="Idcode.cityCode" @change="getCountylist">
          <el-option
            v-for="item in configcityPicker.City"
            :key="item.CITY_CODE"
            :label="item.CITY_NAME"
            :value="item.CITY_CODE"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="5" v-if="infoProvinces.area"
        ><el-select v-model="Idcode.areaCode" @change="getStreetlist">
          <el-option
            v-for="item in configcityPicker.County"
            :key="item.AREA_CODE"
            :label="item.AREA_NAME"
            :value="item.AREA_CODE"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="6" v-if="infoProvinces.street"
        ><el-select
          v-model="Idcode.streetCode"
          @change="
            resetinit({
              type: '',
            })
          "
        >
          <el-option
            v-for="item in configcityPicker.Street"
            :key="item.STREET_CODE"
            :label="item.STREET_NAME"
            :value="item.STREET_CODE"
          >
          </el-option> </el-select
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import requesUrlapi from "../../api/requesUrl";
// import ZfgSelect from "../../components/Select1/index.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},

  props: ["provinces"],
  data() {
    // 这里存放数据
    return {
      options: [],
      infoProvinces: {
        province: false,
        city: false,
        area: false,
        street: false,
      },
      // 省市区街道状态吗
      Idcode: {
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        streetCode: "",
      },

      // 返回数据
      resIdcode: {
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        streetCode: "",
      },

      configcityPicker: {
        province: [],
        City: [],
        County: [],
        Street: [],
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
    this.getprovincelist();
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
    // 初始化select配置项
    getConfigSelect() {
      let provincesdata = this.provinces;
      if (provincesdata.length == 0) {
        let arr = this.infoProvinces;
        for (let key in arr) {
          this.infoProvinces[key] = true;
        }
      } else {
        provincesdata.forEach((item) => {
          this.infoProvinces[item] = true;
        });
      }
    },

    // 获取省份数据地址
    async getprovincelist() {
      try {
        const { data: res } = await requesUrlapi.cityPicker({
          type: "province",
        });
        this.configcityPicker.province = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 获取市数据地址
    async getCitylist(val) {
      this.resetinit({
        type: "city",
      });
      try {
        const { data: res } = await requesUrlapi.cityPicker({
          type: "city",
          province_code: val,
        });
        this.configcityPicker.City = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 获取区县数据地址
    async getCountylist(val) {
      this.resetinit({
        type: "area",
      });
      try {
        const { data: res } = await requesUrlapi.cityPicker({
          type: "area",
          city_code: val,
        });
        this.configcityPicker.County = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 获取街道数据地址
    async getStreetlist(val) {
      this.resetinit({
        type: "street",
      });

      try {
        const { data: res } = await requesUrlapi.cityPicker({
          type: "street",
          area_code: val,
        });
        this.configcityPicker.Street = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 重置默认样式
    resetinit(params) {
      const IDdata = {
        city: ["cityCode", "areaCode", "streetCode"],
        area: ["areaCode", "streetCode"],
        street: ["streetCode"],
      };
      const arrdata = IDdata[params.type];
      if (arrdata) {
        arrdata.forEach((item) => {
          this.Idcode[item] = "";
        });
      }
      this.returnData();
    },
    // 返回数据
    returnData() {
      let resdata = this.resIdcode;
      for (let key in resdata) {
        resdata[key] = this.Idcode[key];
      }
      this.$store.commit("infouserlist/SET_CITYPICKERCODE", resdata);
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
