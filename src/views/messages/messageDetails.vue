<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="信息分类:">
      <el-select
        v-model="form.messageDetailsData.categoryId"
        placeholder="请选择"
        class="infoinp1"
      >
        <el-option
          v-for="item in form.region"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题:">
      <el-input v-model="form.messageDetailsData.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图:">
      <Uploadimg
        :imageUrl.sync="form.imageUrl"
        :Uploadaction="form.qiniuyundata"
      />
      <!-- <el-upload
        class="avatar-uploader"
        action="http://up-z1.qiniup.com"
        :data="form.uploadkey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
    </el-form-item>
    <el-form-item label="发布日期:">
      <el-date-picker
        v-model="form.dateTime"
        type="date"
        placeholder="选择日期"
        disabled
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="详情内容:">
      <quillEditor
        v-model="form.messageDetailsData.content"
        ref="myQuillEditor"
        :options="form.editorOption"
      />
    </el-form-item>
    <el-button type="primary" @click="infonews">确 定</el-button>
  </el-form>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import Uploadimg from "../../components/Uploadimg";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import axios from "axios";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { quillEditor, Uploadimg },
  data() {
    // 这里存放数据
    return {
      form: {
        region: [],
        qiniuyundata: {
          api: "http://up-z1.qiniup.com",
          apipost: "http://120.26.223.80:8848/",
        },
        messageDetailsData: "",
        dateTime: "",
        editorOption: {},
        imageUrl: "",
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {
    messageDetailsData() {
      return this.$store.state.infodetails.infodetailsData;
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getmessageDetailsData();
    this.classify();
    // this.getuploadImgToken();
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
    getmessageDetailsData() {
      this.form.messageDetailsData =
        this.$route.params.data ||
        this.$store.state.infodetails.infodetailsData;
      let date = this.form.messageDetailsData;
      this.form.dateTime = this.timestampToTime(date);
      this.form.imageUrl = this.form.messageDetailsData.imgUrl;
      // console.log(this.form.messageDetailsData);
    },
    // 获取分类列表
    async classify() {
      try {
        const res = await this.$store.dispatch("infoclassify/Classify");
        this.form.region = res.data;
        // console.log(this.form.region);
      } catch (err) {
        console.log(err);
      }
    },
    timestampToTime(row) {
      var date = new Date(row.createDate * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    async infonews() {
      try {
        const res = await this.$store.dispatch("information/newseditInfo", {
          id: Number(this.form.messageDetailsData.id),
          categoryId: Number(this.form.messageDetailsData.categoryId),
          title: this.form.messageDetailsData.title,
          img_url: this.form.imageUrl,
          status: "1",
          content: this.form.messageDetailsData.content,
        });
      } catch (err) {}
    },
    // // 获取七牛云接口
    // getuploadImgToken() {
    //   // try {
    //   //   const res = await this.$store.dispatch("infodetails/newsstatus", {
    //   //     ak: "AXs9_jiNK_Fy4HyYRzujTuxFSm3x6V7M",
    //   //     sk: "gUsR1ngTi08vf4f43p6A7U3B3wT3tvt-bVEW",
    //   //     buckety: "webjshtml",
    //   //   });
    //   //   this.form.uploadkey.token = res.data.token;
    //   // } catch (err) {}
    //   axios.post("http://120.26.223.80:8848/").then((res) => {
    //     this.form.uploadkey.token = res.data;
    //     // console.log(this.form.uploadkey.token);
    //   });
    // },

    // handleAvatarSuccess(file) {
    //   this.form.imageUrl="http://cdn.bobbylee.top/" + file.key
    //   // console.log(file);
    // },
    // // 上传文件时触发的方法
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   // 文件名转码
    //   let suffix = file.name;
    //   let key = encodeURI(`${suffix}`);
    //   this.form.uploadkey.key = key;
    //   // console.log(this.form.uploadkey);
    //   return isJPG && isLt2M;
    // },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
