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
              <el-col :span="14">
                <el-input v-model="loginForm.captcha" clearable></el-input
              ></el-col>
              <el-col :span="6">
                <el-button
                  class="login-CAPTCHA-btn"
                  type="success"
                  @click="loginRegisterCodeBtn(model)"
                  :disabled="logindisabled"
                  >{{ codebtntext }}</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item v-if="model === 0">
            <el-button class="login-button" type="danger" @click="zfgLogin()"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item v-if="model === 1">
            <el-button class="login-button" type="danger" @click="zfgRegister()"
              >注册</el-button
            >
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
    // 密码验证;
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
      // 登录注册按钮切换
      // model: 0,
      // 登录注册tab切换
      curId: 0,
      // 判断验证码的按钮禁用状态
      logindisabled: false,
      // 判断验证码的文字状态
      codebtntext: "验证码",
      loginrules: {
        username: [{ validator: loginUsername, trigger: "blur" }],
        password: [{ validator: loginPassword, trigger: "blur" }],
        passwords: [{ validator: loginPasswords, trigger: "blur" }],
        captcha: [{ validator: loginCsaptcha, trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  computed: {
    // 切换按钮
    items() {
      return this.$store.state.login.items;
    },
    // 登陆组册表单
    loginForm() {
      return this.$store.state.login.loginForm;
    },
    // 登录注册按钮切换状态码
    model: {
      get() {
        return this.$store.state.login.model;
      },
      set(newValue) {
        this.$store.state.login.model = newValue;
      },
    },
  },
  methods: {
    // tab切换
    tab(index) {
      this.curId = index;
      this.model = index;
      this.codebtntext = "验证码";
      this.$nextTick(() => {
        this.$refs["loginForm"].resetFields();
      });
    },
    // 登录注册验证码按钮
    loginRegisterCodeBtn(val) {
      if (val == 0) {
        this.CodeLoginRegister("login");
        // console.log(val);
      } else {
        this.CodeLoginRegister("register");
        // console.log(val);
      }
    },
    // 获取登录注册验证码
    CodeLoginRegister(val) {
      if (this.loginForm.username == "") {
        return this.$message({
          showClose: true,
          message: "用户名不能为空！！！",
          type: "warning",
          center: true,
        });
      }
      setTimeout(async () => {
        const res = await this.$store.dispatch("login/loginCode", {
          username: this.loginForm.username,
          module: val,
        });
        // 393086316@qq.com
        if (res) {
          this.logindisabled = true;
          this.codebtntext = "发送中";
          this.timecount(10);
        }
      }, 1000);
    },
    // 验证码倒计时函数
    timecount(val) {
      if (times) {
        clearInterval(times);
      }
      let time = val;
      let times;
      times = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(times);
          (this.logindisabled = false), (this.codebtntext = "重新发送");
        } else {
          this.codebtntext = `倒计时${time}秒`;
        }
      }, 1000);
    },
    // 登录
    async zfgLogin() {
      try {
        await this.$store.dispatch("login/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
          code: this.loginForm.captcha,
        });
        this.$router.push("/console");
      } catch (err) {
        console.log(err);
      }
    },

    // 注册
    async zfgRegister() {
      try {
        await this.$store.dispatch("login/register", {
          username: this.loginForm.username,
          password: this.loginForm.password,
          code: this.loginForm.captcha,
        });
        this.$nextTick(() => {
          this.$refs["loginForm"].resetFields();
        });
      } catch (err) {
        console.log(err);
      }
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
    transition: 2s;
    background-color: transparent;
  }
  .el-button--success {
    font-size: 12px;
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
