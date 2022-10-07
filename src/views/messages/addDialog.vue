<template>
  <div>
    <el-dialog
      :title="type"
      :visible.sync="DialogVisible"
      width="30%"
      @close="addinfoclose"
      @open="openClassify"
    >
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="类型:" prop="region">
          <el-select v-model="form.categoryId" placeholder="请选择活动区域">
            <el-option
              v-for="item in form.region"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" porp="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="概况:" porp="content">
          <el-input
            type="textarea"
            v-model="form.content"
            :autosize="{ minRows: 6, maxRows: 4 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addinfonews">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addDialog",
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["flag", "type", "Classify", "infodata"],
  data() {
    // 这里存放数据
    return {
      //对话框
      DialogVisible: false,
      form: {
        categoryId: "",
        id: "",
        content: "",
        create_date: "2016-05-02",
        image_url: "http://qv18xxim7.hn-bkt.clouddn.com/1-7.jpg",
        status: "1",
        title: "",
        region: [],
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.DialogVisible = newValue;
      },
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
    addinfoclose() {
      this.DialogVisible = false;
      this.$emit("infoclose", this.DialogVisible);
    },
    openClassify() {
      if (this.type == "新增") {
        this.form.region = this.Classify;
      } else if (this.type == "编辑") {
        this.form.region = this.Classify;
        this.form.title = this.infodata.title;
        this.form.id = this.infodata.id;
        this.form.content = this.infodata.content;
        this.form.categoryId = this.infodata.categoryId;
      }
    },

    // 添加信息
    addinfonews() {
      if (this.type == "新增") {
        this.addinfo();
      } else if (this.type == "编辑") {
        this.infonews();
      }
    },
    async addinfo() {
      try {
        const res = await this.$store.dispatch("information/newsadd", {
          category_id: this.form.categoryId,
          content: this.form.content,
          create_date: this.form.create_date,
          // status: "1",
          title: this.form.title,
        });
        // this.$nextTick(() => {
        //   this.$refs["form"].resetFields();
        // });
        this.$emit("infogetlist");
        this.DialogVisible = false;
      } catch (err) {
        console.log(err);
      }
    },
    async infonews() {
      try {
        const res = await this.$store.dispatch("information/newseditInfo", {
          id: Number(this.form.id),
          categoryId: Number(this.form.categoryId),
          title: this.form.title,
          content: this.form.content,
          img_url: this.form.image_url,
          status: this.form.status,
        });
        this.DialogVisible = false;
      } catch (err) {
        console.log(err);
        console.log(Number(this.form.categoryId));
        console.log(Number(this.form.id));
        console.log(this.form.title);
        console.log(this.form.content);
        console.log(this.form.image_url);
        console.log(this.form.status);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
::v-deep .el-dialog__footer {
  padding: 0px 20px 50px;
  text-align: right;
  box-sizing: border-box;
}
</style>
