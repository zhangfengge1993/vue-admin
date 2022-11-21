<template>
  <div>
    <el-dialog
      :title="type"
      :visible.sync="DialogVisible"
      @close="addinfoclose"
      @open="getuserrole"
      width="40%"
    >
      <el-form
        ref="adduserdata"
        :model="adduserdata"
        label-width="70px"
        :rules="loginrules"
      >
        <el-form-item label="用户" prop="username">
          <el-input
            v-model="adduserdata.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            v-model="adduserdata.password"
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="truename">
          <el-input
            v-model="adduserdata.truename"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model.number="adduserdata.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <ZfgCascader
            :provinces="['province', 'city', 'area', 'street']"
          ></ZfgCascader>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-radio v-model="adduserdata.status" label="1">禁用</el-radio>
          <el-radio v-model="adduserdata.status" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item label="系统" prop="role">
          <el-checkbox-group v-model="adduserdata.role">
            <el-checkbox
              v-for="(item, index) in checkList"
              :label="item.role"
              :key="index"
              >{{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="按钮权限">
          <template v-if="checkbtnList.length > 0">
            <br />
            <div v-for="(item, index) in checkbtnList" :key="index">
              <h4>{{ item.name }}</h4>
              <template v-if="item.perm && item.perm.length > 0">
                <el-checkbox-group v-model="adduserdata.btnPerm">
                  <el-checkbox
                    v-for="(i, index) in item.perm"
                    :label="i.value"
                    :key="index"
                    >{{ i.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
            </div>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="userSubmitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ZfgCascader from "../../components/Cascader/index.vue";
import users from "../../api/users";
import { Message } from "element-ui";
// 引入正则,过滤特殊字符函数
import {
  stripscript,
  regularUsername,
  regularPassword,
} from "../../reuse/reuse";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { ZfgCascader },
  props: ["flag", "type", "idData"],
  data() {
    // 这里存放数据
    // 用户名验证
    var addUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱名不能为空！"));
      } else if (!regularUsername(value)) {
        callback(new Error("请输入正确邮箱格式！"));
      } else {
        callback();
      }
    };
    // 密码验证;
    var adduserPassword = (rule, value, callback) => {
      if (this.adduserdata.id && !value) {
        callback();
      }
      if ((this.adduserdata.id && value) || !this.adduserdata.id) {
        if (value) {
          this.adduserdata.password = stripscript(value);
          value = this.adduserdata.password;
        }
        // 过滤特殊字符
        if (value === "") {
          callback(new Error("密码不能为空！"));
        } else if (!regularPassword(value)) {
          callback(new Error("密码必须由数字、字母,请输入6-20位"));
        } else {
          callback();
        }
      }
    };
    return {
      //对话框
      DialogVisible: false,
      checkList: [],
      checkbtnList: [],
      adduserdata: {
        username: "",
        password: "",
        truename: "",
        phone: "",
        region: [],
        status: 2,
        role: [],
        btnPerm: [],
      },
      loginrules: {
        username: [{ validator: addUsername, trigger: "blur" }],
        password: [{ validator: adduserPassword, trigger: "blur" }],
        role: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change",
          },
        ],
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
    // 关闭Dialog 的回调
    addinfoclose() {
      this.DialogVisible = false;
      this.$emit("infoclose");
      this.resetForm();
      // 通过全局事件总线来调用刷新用户列表
      this.$bus.$emit("getdatalist");
      // console.log(this.$store.state.infouserlist.citypickercode);
    },
    userSubmitForm() {
      this.$refs["adduserdata"].validate((valid) => {
        if (valid) {
          if (this.type == "新增") {
            this.adduser();
          } else if (this.type == "编辑") {
            this.edituser();
          }
        } else {
          return false;
        }
      });
    },

    // 添加用户
    async adduser() {
      try {
        const { data: res } = await users.adduser({
          username: this.adduserdata.username,
          password: this.adduserdata.password,
          truename: this.adduserdata.truename,
          phone: this.adduserdata.phone,
          region: JSON.stringify(this.$store.state.infouserlist.citypickercode),
          status: this.adduserdata.status,
          role: this.adduserdata.role.join(),
          btnPerm: this.adduserdata.btnPerm.join(),
        });
        if (res.resCode == 0) {
          Message({
            message: res.message,
            type: "success",
            duration: 1000,
          });
        } else {
          Message({
            message: res.message,
            type: "error",
          });
        }
      } catch (err) {
        console.log(err);
      }
      // // 通过全局事件总线来调用刷 新用户列表
      // this.$bus.$emit("getdatalist");
      this.DialogVisible = false;
      this.resetForm();
    },
    // 编辑用户
    async edituser() {
      try {
        const { data: res } = await users.useredit({
          id: this.adduserdata.id,
          username: this.adduserdata.username,
          truename: this.adduserdata.truename,
          phone: this.adduserdata.phone,
          region: JSON.stringify(this.$store.state.infouserlist.citypickercode),
          status: this.adduserdata.status,
          role: this.adduserdata.role.join(),
          btnPerm: this.adduserdata.btnPerm.join(),
        });
        if (res.resCode == 0) {
          Message({
            message: res.message,
            type: "success",
            duration: 1000,
          });
        } else {
          Message({
            message: res.message,
            type: "error",
          });
        }
      } catch (err) {
        console.log(err);
      }
      // // 通过全局事件总线来调用刷 新用户列表
      // this.$bus.$emit("getdatalist");
      this.DialogVisible = false;
      this.resetForm();
    },
    // 重置默认样式
    resetForm() {
      this.$refs["adduserdata"].resetFields();
    },

    // 获取角色权限
    async getuserrole() {
      const { data: res } = await users.role();
      if (res.resCode == 0) {
        this.checkList = res.data;
        // console.log(res.data);
      } else {
        Message({
          message: res.message,
          type: "error",
        });
      }
      const { data: res1 } = await users.permButton();
      if (res1.resCode == 0) {
        this.checkbtnList = res1.data;
        // console.log(this.checkbtnList);
      } else {
        Message({
          message: res1.message,
          type: "error",
        });
      }
      if (this.type == "编辑") {
        let editdata = this.idData.data;
        // console.log(editdata);
        editdata.role = editdata.role ? editdata.role.split(",") : [];
        editdata.btnPerm = editdata.btnPerm ? editdata.btnPerm.split(",") : [];
        for (let key in editdata) {
          this.adduserdata[key] = editdata[key];
        }
      }
    },
  },
};
</script>

<style lang='scss' >
//@import url(); 引入公共css类
</style>
