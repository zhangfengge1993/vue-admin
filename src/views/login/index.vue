<template>
  <div class="zfg-login">
    <div class="zfg-login-div">
      <div class="zfg-login-btn">
        <span
          v-for="(i, index) in items"
          :key="index"
          @click="tab(index)"
          :class="{ active: index === curId }"
          >{{ i.item }}</span
        >
      </div>
      <div class="zfg-login-centter">
        <el-form
          :model="loginForm"
          class="login-ruleForm"
          ref="loginForm"
          refs="loginForm"
          :rules="loginrules"
          status-icon
        >
          <el-form-item prop="username">
            <label>邮箱</label>
            <el-input
              v-model="loginForm.username"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <label>密码</label>
            <el-input v-model="loginForm.password" clearable></el-input>
          </el-form-item>
          <el-form-item prop="passwords" v-if="model === 1">
            <label>重复密码</label>
            <el-input v-model="loginForm.passwords" clearable></el-input>
          </el-form-item>
          <el-form-item prop="captcha" clearable>
            <label>验证码</label>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input v-model="loginForm.captcha" clearable></el-input
              ></el-col>
              <el-col :span="4">
                <el-button class="login-CAPTCHA-btn" type="success"
                  >验证码</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item v-show="model === 0">
            <el-button
              class="login-button"
              type="danger"
              @click="submitloginForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item v-show="model === 1">
            <el-button class="login-button" type="danger">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// 引入正则,过滤特殊字符函数
import {
  stripscript,
  regularUsername,
  regularPassword,
  regularCsaptcha,
} from "../../reuse/reuse";
export default {
  name: "",
  data() {
    // 用户名验证
    var loginUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱名不能为空！"));
      } else if (!regularUsername(value)) {
        callback(new Error("请输入正确邮箱格式！"));
      } else {
        callback();
      }
    };
    // 密码验证
    var loginPassword = (rule, value, callback) => {
      // 过滤特殊字符
      this.loginForm.password = stripscript(value);
      value = this.loginForm.password;

      if (value === "") {
        callback(new Error("密码不能为空！"));
      } else if (!regularPassword(value)) {
        callback(new Error("密码必须由数字、字母,请输入6-20位"));
      } else {
        callback();
      }
    };
    // 重复密码验证
    var loginPasswords = (rule, value, callback) => {
      // 过滤特殊字符
      if (value === "") {
        callback(new Error("密码不能为空！"));
      } else if (value != this.loginForm.password) {
        callback(new Error("重复密码不正确！"));
      } else {
        callback();
      }
    };
    // 验证码验证
    var loginCsaptcha = (rule, value, callback) => {
      // 过滤特殊字符
      this.loginForm.captcha = stripscript(value);
      value = this.loginForm.captcha;

      if (value === "") {
        callback(new Error("验证码不能为空！"));
      } else if (!regularCsaptcha(value)) {
        callback(new Error("验证码必须由6位组成"));
      } else {
        callback();
      }
    };
    return {
      model: 0,
      curId: 0,
      items: [{ item: "登录" }, { item: "注册" }],
      loginForm: {
        username: "",
        password: "",
        passwords: "",
        captcha: "",
      },
      loginrules: {
        username: [{ validator: loginUsername, trigger: "blur" }],
        password: [{ validator: loginPassword, trigger: "blur" }],
        passwords: [{ validator: loginPasswords, trigger: "blur" }],
        captcha: [{ validator: loginCsaptcha, trigger: "blur" }],
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    // tab切换
    tab(index) {
      this.curId = index;
      this.model = index;
    },
    submitloginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          console.log(this.loginForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.zfg-login {
  width: 100%;
  height: 100vh;
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F658624b32c34a5a04c9e0ee870cd71090f95514b.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653163040&t=76a3747fc05e9322c9f817b13c4241fb)
    no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .zfg-login-div {
    width: 400px;
    height: 700px;
    margin: 0 auto;
    margin-top: 100px;
    transition: 1s;
    background-color: transparent;
  }
  .zfg-login-btn {
    width: 100%;
    height: 10%;
    background-color: transparent;
    display: flex;
    justify-content: space-around;
    span {
      display: block;
      width: 50%;
      height: 100%;
      display: flex;
      font-weight: 900;
      align-items: center;
      font-size: 20px;
      justify-content: center;
      background-color: transparent;
      cursor: pointer;
    }
    .active {
      color: #fff;
      font-size: 26px;
      transition: 1s;
    }
  }
  .zfg-login-centter {
    margin-top: 30px;
    width: 100%;
    height: 85%;
    color: #fff;
    font-weight: 900;
    // background-color: #fff;
    .login-ruleForm {
      width: 80%;
      margin: 0 auto;
    }
    .login-button {
      margin-top: 20px;
      width: 100%;
    }
    .login-CAPTCHA-btn {
      margin-left: 8px;
    }
  }
}
</style>
