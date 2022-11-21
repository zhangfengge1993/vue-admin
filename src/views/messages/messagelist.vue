<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :inline="true" :model="formInline">
      <div class="messagelistquery">
        <el-form-item label="分类:">
          <el-select
            v-model="formInline.typevalue"
            placeholder="请选择"
            class="infoinp1"
          >
            <el-option
              v-for="item in formInline.ClassifyName"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="formInline.datevalue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
            value-format="yyyy-MM-dd-HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关键字:">
          <el-select v-model="formInline.IDvalue" class="infoinp2">
            <el-option
              v-for="item in formInline.options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <ZfgSelect :config="formInline.options1" /> -->
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-input
              v-model="formInline.infosearch"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" class="seachinp" @click="search"
              >搜索</el-button
            >
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="addDialogVisible = true"
            v-if="btnPer('info:add')"
            >新增</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <!-- 表格数据-->
    <el-table
      :data="newslist"
      border
      style="width: 100%"
      class="messagelisttable"
      @selection-change="deleteAllid"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="530"> </el-table-column>
      <el-table-column prop="categoryId" label="类别" :formatter="newtype">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        :formatter="timestampToTime"
      >
      </el-table-column>
      <el-table-column prop="custodian" label="管理人"> </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            v-if="btnPer('info:del')"
            @click="deleteEdit(scope.row.id)"
            >删除</el-button
          >
          <el-button
            type="success"
            size="mini"
            v-if="btnPer('info:edit')"
            @click="infoEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="success"
            size="mini"
            v-if="btnPer('info:detailed')"
            @click="infoDetails(scope.row)"
          >
            编辑详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <div class="footerpage">
      <el-button
        type="primary"
        size="mini"
        @click="deleteAllEdit"
        v-if="btnPer('info:batchDel')"
        >批量删除</el-button
      >
      <el-pagination
        background
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="newstotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 新增对话框 -->
    <!-- <AddDialog :flag="addDialogVisible" @addinfoclose="addinfoclose" /> -->
    <AddDialog
      :flag="addDialogVisible"
      @infoclose="infoclose('add')"
      :type="'新增'"
      :Classify="formInline.ClassifyName"
      @infogetlist="newsgetlist"
    />
    <!-- 修改对话框 -->
    <AddDialog
      :flag="editDialogVisible"
      :Classify="formInline.ClassifyName"
      @infoclose="infoclose('edit')"
      :type="'编辑'"
      :infodata="infodata"
    />
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import AddDialog from "./addDialog.vue";
import ZfgSelect from "../../components/Select";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { AddDialog, ZfgSelect },
  data() {
    // 这里存放数据
    return {
      formInline: {
        // 分类列表
        ClassifyName: [],
        options1: [
          {
            value: "id",
            label: "id",
          },
          {
            value: "title",
            label: "标题",
          },
        ],
        // 类型
        typevalue: "",
        // 时间
        datevalue: "",
        // 关键字
        IDvalue: "",
        // 搜索
        infosearch: "",
      },
      // 信息列表
      newslist: [],
      // 信息页码数量
      newstotal: 0,
      page: {
        pageNumber: 1,
        pageSize: 5,
      },

      // 新增对话框触发布尔值
      addDialogVisible: false,
      // 编辑对话框触发布尔值
      editDialogVisible: false,
      // 时间戳
      timestamp: 0,
      // 删除信息
      newsinfoid: "",
      newsinfoallid: "",
      infodata: {},
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.classify();
    this.newsgetlist();
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
    // 每页条数
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.newsgetlist();
    },

    handleCurrentChange(val) {
      this.page.pageNumber = val;
      this.newsgetlist();
    },
    // 新增编辑对话框出发函数
    infoclose(value) {
      if ("add" == value) {
        this.addDialogVisible = false;
      } else if ("edit" == value) {
        this.editDialogVisible = false;
      }
    },
    // 获取分类列表
    async classify() {
      try {
        const res = await this.$store.dispatch("infoclassify/Classify");
        this.formInline.ClassifyName = res.data;
        // console.log(this.formInline.ClassifyName);
      } catch (err) {
        console.log(err);
      }
    },
    // 搜索
    search() {
      // let data = this.newdata();
      this.newsgetlist();
    },
    // 获取需要搜索的数据
    newdata() {
      let data = {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize,
      };
      if (this.formInline.typevalue) {
        data.categoryId = this.formInline.typevalue;
      }
      data[this.formInline.IDvalue] = this.formInline.infosearch;
      return data;
    },
    // 获取信息列表
    async newsgetlist() {
      let data = this.newdata();
      try {
        const res = await this.$store.dispatch("information/newsgetList", data);
        this.newslist = res.data.data;
        this.newstotal = res.data.total;
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    // 删除数据
    deleteEdit(id) {
      this.newsinfoid = [id];
      this.confirm({
        text: "确定删除信息",
        fn: this.deleteEditapi,
        fncatch: () => {
          this.newsinfoid = "";
        },
      });
    },
    // 修改数据
    infoEdit(val) {
      this.editDialogVisible = true;
      this.infodata = val;
      // console.log(this.infodata, 11);
    },
    // 调用删除数据api
    async deleteEditapi() {
      try {
        const res = await this.$store.dispatch("information/newsdeleteInfo", {
          id: this.newsinfoid,
        });
        this.newsgetlist();
      } catch (err) {
        console.log(err);
      }
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
          fn: this.deleteAllEditapi,
          fncatch: () => {
            this.newsinfoallid = "";
          },
        });
      }
    },
    // 全选获取的id
    deleteAllid(val) {
      this.newsinfoallid = val.map((item) => item.id);
    },
    // 调用全部删除数据api
    async deleteAllEditapi() {
      try {
        const res = await this.$store.dispatch("information/newsdeleteInfo", {
          id: this.newsinfoallid,
        });
        this.newsgetlist();
      } catch (err) {
        console.log(err);
      }
    },
    // 时间戳
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
    // 类型
    newtype(row) {
      let ClassifyName;
      this.formInline.ClassifyName.filter((item) => {
        if (item.id == row.categoryId) {
          ClassifyName = item.category_name;
        }
      });
      return ClassifyName;
    },
    // 详情页跳转
    infoDetails(data) {
      this.$store.commit("infodetails/SET_DATE", data);
      this.$router.push({
        name: "messageDetails",
        params: {
          data: data,
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep .el-form-item__label,
::v-deep .el-range-input,
::v-deep .el-range-separator,
::v-deep .el-table,
::v-deep .el-input {
  font-size: 12px;
  font-weight: 900;
}
::v-deep .infoinp1 {
  width: 100px;
}
::v-deep .infoinp2 {
  width: 70px;
}
.el-date-editor--daterange.el-input__inner {
  width: 270px;
}
::v-deep .el-table th.el-table__cell > .cell,
::v-deep .el-table .cell {
  text-align: center;
}
::v-deep .el-table--border .el-table__cell:first-child .cell {
  padding-left: 15px;
}
.messagelistquery {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.messagelisttable {
  margin-bottom: 20px;
}
.cell a {
  color: #fff;
}
.footerpage {
  display: flex;
  justify-content: space-between;
}
</style>
