<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="Uploadaction.api"
      :data="form.uploadkey"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "uploadimg",
  // import引入的组件需要注入到对象中才能使用
  props: ["imageUrl", "Uploadaction"],
  components: {},
  data() {
    // 这里存放数据
    return {
      form: {
        imageUrl: "",
        uploadkey: {
          token: "",
          key: "",
        },
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    imageUrl: {
      handler(newValue, oldValue) {
        this.form.imageUrl = newValue;
      },
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getuploadImgToken();
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
    // 获取七牛云接口
    getuploadImgToken() {
      // try {
      //   const res = await this.$store.dispatch("infodetails/newsstatus", {
      //     ak: "AXs9_jiNK_Fy4HyYRzujTuxFSm3x6V7M",
      //     sk: "gUsR1ngTi08vf4f43p6A7U3B3wT3tvt-bVEW",
      //     buckety: "webjshtml",
      //   });
      //   this.form.uploadkey.token = res.data.token;
      // } catch (err) {}
      axios.post(this.Uploadaction.apipost).then((res) => {
        this.form.uploadkey.token = res.data;
        // console.log(this.form.uploadkey.token);
      });
      console.log(this.imageUrl);
    },

    handleAvatarSuccess(file) {
      this.form.imageUrl = "http://cdn.bobbylee.top/" + file.key;
      this.$emit("update:imageUrl", this.form.imageUrl);
    },
    // 上传文件时触发的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 文件名转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      this.form.uploadkey.key = key;
      // console.log(this.form.uploadkey);
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
