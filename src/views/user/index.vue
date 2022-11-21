<template>
  <div>
    <el-row>
      <el-col :span="20">
        <!-- 搜索表单 -->
        <el-form :inline="true" :model="formUser">
          <el-form-item label="关键字:">
            <ZfgSelect :config="formUser.configOption" />
          </el-form-item>
          <el-form-item>
            <el-form-item>
              <el-input
                v-model="formUser.UserSearch"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" class="seachinp" @click="userSearch"
                >搜索</el-button
              >
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4"
        ><el-button type="danger" @click="addDialogVisible = true"
          >新增用户</el-button
        ></el-col
      >
    </el-row>
    <!-- 表格数据-->
    <ZfgTable :config="configTable" ref="usertable">
      <template v-slot:status="data">
        <el-switch
          v-model="data.data.status"
          active-value="2"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="useractives(data)"
        >
        </el-switch>
      </template>
      <template v-slot:operation="data">
        <el-button type="danger" size="mini" @click="deleteUser(data)"
          >删除</el-button
        >
        <el-button type="success" size="mini" @click="EditUser(data)"
          >编辑</el-button
        >
      </template>
    </ZfgTable>
    <!-- 新增用户对话框 -->
    <ZfgDialog
      :type="'新增'"
      :flag="addDialogVisible"
      @infoclose="infoclose('新增')"
    >
    </ZfgDialog>
    <!-- 编辑用户对话框 -->
    <ZfgDialog
      :type="'编辑'"
      :flag="editDialogVisible"
      :idData="idData"
      @infoclose="infoclose('编辑')"
    >
    </ZfgDialog>
  </div>
</template>

<script>
import ZfgSelect from "../../components/Select/index.vue";
import ZfgTable from "../../components/Table/index.vue";
import ZfgDialog from "../../components/Dialog/addDialog.vue";
import users from "../../api/users";
import { Message } from "element-ui";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { ZfgSelect, ZfgTable, ZfgDialog },
  data() {
    // 这里存放数据
    return {
      formUser: {
        // 分类列表
        userkeyword: [],
        configOption: [
          {
            value: "username",
            label: "用户名",
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
      // table 用户列表初始化
      configTable: {
        selection: true,
        configTableCheckbox: true,
        thead: [
          {
            label: "邮箱/用户名",
            prop: "username",
          },
          {
            label: "真实姓名",
            prop: "truename",
          },
          {
            label: "手机号",
            prop: "phone",
          },
          {
            label: "地区",
            prop: "region",
          },
          {
            label: "角色",
            prop: "role",
          },
          {
            label: "禁用状态",
            theadType: "status",
            statusname: "status",
          },
          {
            label: "操作",
            theadType: "status",
            statusname: "operation",
          },
        ],
        page: {
          // 信息页码数量
          userStotal: 0,
          pageNumber: 1,
          pageSize: 5,
          pageSizes: [5, 10, 20, 50],
          pageflag: true,
        },
      },
      addDialogVisible: false,
      editDialogVisible: false,
      // 编辑用户
      idData: {},
      selectres: {},
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
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
    // 删除用户
    async deleteUser(val) {
      try {
        const { data: res } = await users.deleteuser({
          id: [val.data.id],
        });
        if (res.resCode == 0) {
          Message({
            message: res.message,
            type: "success",
            duration: 1000,
          });
          // 通过子组件ref 来调用父组件的方法
          this.$refs.usertable.getdatalist();
          // this.$bus.$emit("getdatalist");
        } else {
          Message({
            message: res.message,
            type: "error",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 用户禁启用
    async useractives(val) {
      try {
        const { data: res } = await users.useractives({
          id: val.data.id,
          status: val.data.status,
        });
        if (res.resCode == 0) {
          Message({
            message: res.message,
            type: "success",
            duration: 1000,
          });
          // 通过子组件ref 来调用父组件的方法
          this.$refs.usertable.getdatalist();
          // this.$bus.$emit("getdatalist");
        } else {
          Message({
            message: res.message,
            type: "error",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 编辑用户
    EditUser(val) {
      this.editDialogVisible = true;
      this.idData = val;
    },
    // 新增编辑对话框出发函数
    infoclose(val) {
      if ("新增" == val) {
        this.addDialogVisible = false;
      } else if ("编辑" == val) {
        this.editDialogVisible = false;
      }
    },
    // 用户搜索
    userSearch() {
      let res = this.$store.state.infouserlist.selectres;
      let resdata = {
        [res.value]: this.formUser.UserSearch,
      };
      // this.$refs.usertable.newdata(resdata);
      this.$refs.usertable.getdatalist(resdata);
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
