<template>
  <div>
    <el-table
      :data="userlist"
      border
      style="width: 100%"
      class="userlisttable"
      @selection-change="deleteAllid"
    >
      <!-- 多选框 -->
      <el-table-column
        v-if="configTablelist.selection"
        type="selection"
        width="45"
      ></el-table-column>

      <template v-for="item in configTablelist.thead">
        <!-- slot -->
        <el-table-column
          v-if="item.theadType === 'status'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.watch"
        >
          <template slot-scope="scope">
            <slot :name="item.statusname" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- function -->
        <!-- <el-table-column
          v-else-if="item.theadType === 'function'"
          :prop="item.prop"
          :label="item.label"
          :width="item.watch"
        >
          <template slot-scope="scope">
            <slot :name="item.statusname" :data="scope.row"></slot>
          </template>
        </el-table-column> -->
        <!-- 文本数据渲染 -->
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :width="item.watch"
        >
        </el-table-column>
      </template>
    </el-table>
    <!-- 底部分页 -->
    <div class="footerpage">
      <el-button type="primary" size="mini" @click="deleteAllEdit"
        >批量删除</el-button
      >
      <el-pagination
        v-if="configTablelist.page.pageflag"
        background
        :page-sizes="configTablelist.page.pageSizes"
        :page-size="configTablelist.page.pageSize"
        :current-page="configTablelist.page.pageNumber"
        layout="total, sizes, prev, pager, next, jumper"
        :total="configTablelist.page.userStotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import usersapi from "../../api/users";
import { Message } from "element-ui";
// import tableMethods from "./tableapi";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["config"],
  data() {
    // 这里存放数据
    return {
      //   用户列表
      configTablelist: {
        // 多选框
        selection: true,
        // 翻页记录checkbox
        configTableCheckbox: false,
        // 表头
        thead: [],
        // 请求地址
        requesData: {},
        page: {
          // 信息页码数量
          userStotal: 0,
          pageNumber: 1,
          pageSize: 5,
          pageSizes: [1, 10, 20, 50],
          pageflag: true,
        },
      },

      //   表格数据列表
      userlist: [
        // {
        //   username: "王小虎",
        //   truename: "上海",
        //   phone: "普陀区",
        //   region: "上海市普陀区金沙江路 1518 弄",
        //   role: 200333,
        //   status: true,
        // },
      ],
      // 删除信息
      newsinfoid: "",
      newsinfoallid: "",
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    userlist: {
      handler(newValue, oldValue) {
        this.userlist = newValue;
      },
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）

  created() {
    this.getConfigTable();
    this.getdatalist();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 通过全局事件总线来调用刷新用户列表
    this.$bus.$on("getdatalist", this.getdatalist);
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    // 初始化table配置项
    getConfigTable() {
      let configdata = this.config;
      let keys = Object.keys(this.configTablelist); //es6获取对象key名的方法
      for (let key in configdata) {
        //includes(key)
        if (keys.includes(key)) {
          this.configTablelist[key] = configdata[key];
        }
      }
    },
    // 全选获取的id
    deleteAllid(val) {
      this.newsinfoallid = val.map((item) => item.id);
    },
    // 删除全部数据
    deleteAllEdit() {
      if (this.newsinfoallid.length == 0 || !this.newsinfoallid) {
        this.$message({
          type: "info",
          message: "请选择要删除的信息",
        });
      } else {
        this.confirm({
          text: "确定删除全部信息",
          fn: this.deleteallUser,
          fncatch: () => {
            this.newsinfoallid = "";
          },
        });
      }
    },
    // 删除全部用户
    async deleteallUser() {
      try {
        const { data: res } = await usersapi.deleteuser({
          id: this.newsinfoallid,
        });
        if (res.resCode == 0) {
          Message({
            message: res.message,
            type: "success",
            duration: 1000,
          });
          this.getdatalist();
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
    // 获取数据地址
    async getdatalist(val) {
      let data = Object.assign({}, val, {
        pageNumber: this.configTablelist.page.pageNumber,
        pageSize: this.configTablelist.page.pageSize,
      });
      // delete data["undefined"];
      // console.log(data);
      try {
        const { data: res } = await usersapi.userlist(data);
        this.userlist = res.data.data;
        this.configTablelist.page.userStotal = res.data.total;
      } catch (err) {
        console.log(err);
      }
    },
    // // 获取需要搜索的数据
    // newdata(val) {
    //   let data = {
    //     pageNumber: this.configTablelist.page.pageNumber,
    //     pageSize: this.configTablelist.page.pageSize,
    //   };

    //   return data;
    // },
    // 每页条数
    handleSizeChange(val) {
      this.configTablelist.page.pageSize = val;
      this.getdatalist();
      //   console.log(this.configTablelist.page.pageSize);
    },

    handleCurrentChange(val) {
      this.configTablelist.page.pageNumber = val;
      this.getdatalist();
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
::v-deep .el-table th.el-table__cell > .cell,
::v-deep .el-table .cell {
  text-align: center;
  font-size: 12px;
  font-weight: 900;
}
.footerpage {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
