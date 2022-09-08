<template>
  <div>
    <div class="infoclassbtn">
      <el-button
        type="danger"
        @click="addoneClassify({ submittype: 'addoneClassify' })"
        >添加一级分类</el-button
      >
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="10"
        ><div class="infoclassdiv1" v-for="i in ClassifyName" :key="i.id">
          <div class="infoclassnav">
            <h4>
              <i class="el-icon-circle-plus"></i><b>{{ i.category_name }}</b>
              <div class="nfoclassnavbtn">
                <el-button
                  type="danger"
                  round
                  size="mini"
                  @click="
                    editoneClassify({
                      category_name: i.category_name,
                      id: i.id,
                      submittype: 'editoneClassify',
                    })
                  "
                  >编辑</el-button
                >
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="
                    ChildrenClassify({
                      submittype: 'addtowClassify',
                      category_name: i.category_name,
                      id: i.id,
                    })
                  "
                  >添加子级</el-button
                >
                <el-button round size="mini" @click="deleteEdit(i.id)"
                  >删除</el-button
                >
              </div>
            </h4>
            <ul>
              <li v-for="item in i.children" :key="item.id">
                {{ item.category_name }}
                <div class="nfoclassnavbtn">
                  <el-button type="danger" round size="mini">编辑</el-button>
                  <el-button round size="mini">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="14"
        ><div class="infoclassdiv2">
          <h4>
            <b>一级分类编辑</b>
          </h4>
          <div class="infoclassdiv2inputfrom">
            <el-form
              ref="form1"
              :model="form"
              label-width="100px"
              :rules="loginrules"
            >
              <el-form-item
                label="一级分类名称"
                prop="categoryName"
                v-if="oneClassify"
              >
                <el-input
                  v-model="form.categoryName"
                  :disabled="oneClassifyinfo"
                ></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称" v-if="towClassify">
                <el-input
                  v-model="form.setcategoryName"
                  :disabled="towClassifyinfo"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="submit" :disabled="submitinfo"
                  >确定</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 用户名验证
    var categoryName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("分类名不能为空！"));
      } else {
        callback();
      }
    };
    // 这里存放数据
    return {
      form: {
        categoryName: "",
        setcategoryName: "",
      },
      loginrules: {
        categoryName: [{ validator: categoryName, trigger: "blur" }],
      },
      // 分类列表
      ClassifyName: [],
      // 切换一二级分类的状态
      oneClassify: true,
      towClassify: true,
      // 解除一二级分类的禁用布尔值
      oneClassifyinfo: true,
      towClassifyinfo: true,
      // 提交禁用状态的布尔值
      submitinfo: true,
      submittype: "",
      // 删除id
      deleteEditid: "",
      // 一级分类id
      oneClassifyid: "",
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.Classify();
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
    // 添加分类
    async submit() {
      if (this.submittype == "addoneClassify") {
        // 添加一级信息分类
        try {
          const res = await this.$store.dispatch(
            "infoclassify/addoneClassify",
            {
              categoryName: this.form.categoryName,
            }
          );
          if (res) {
          }
          this.Classify();
          this.$refs["form1"].resetFields();
        } catch (err) {
          console.log(err);
        }
      }
      // 修改一级分类
      else if (this.submittype == "editoneClassify") {
        try {
          const res = await this.$store.dispatch("infoclassify/editCategory", {
            categoryName: this.form.categoryName,
            id: this.oneClassifyid,
          });
          if (res) {
          }
          this.Classify();
        } catch (err) {
          console.log(err);
        }
      }
      // 添加子级分类
      else if (this.submittype == "addtowClassify") {
        try {
          const res = await this.$store.dispatch(
            "infoclassify/addtowClassify",
            {
              categoryName: this.form.setcategoryName,
              parentId: this.oneClassifyid,
            }
          );
          if (res) {
          }
          this.Classify();
          this.form.setcategoryName = "";
        } catch (err) {
          console.log(err);
        }
      }
    },
    // 获取分类列表
    async Classify() {
      try {
        const res = await this.$store.dispatch("infoclassify/Classify");
        this.ClassifyName = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 删除数据
    deleteEdit(ids) {
      this.deleteEditid = ids;
      this.confirm({
        text: "确定删除信息",
        fn: this.deleteCategory,
        fncatch: () => {
          this.deleteEditid = "";
        },
      });
    },
    async deleteCategory() {
      try {
        const res = await this.$store.dispatch("infoclassify/deleteCategory", {
          categoryId: this.deleteEditid,
        });
        this.Classify();
      } catch (err) {
        console.log(err);
      }
    },
    // 添加一级分类解除禁用状态
    addoneClassify(params) {
      this.oneClassify = true;
      this.towClassify = false;
      this.oneClassifyinfo = false;
      this.submitinfo = false;
      this.submittype = params.submittype;
      this.$refs["form1"].resetFields();
    },
    // 修改一级分类解除禁用状态
    editoneClassify(params) {
      this.oneClassify = true;
      this.towClassify = false;
      this.oneClassifyinfo = false;
      this.submitinfo = false;
      this.form.categoryName = params.category_name;
      this.submittype = params.submittype;
      this.oneClassifyid = params.id;
    },
    // 添加子级分类解除禁用状态
    ChildrenClassify(params) {
      this.oneClassify = true;
      this.towClassify = true;
      this.submitinfo = false;
      this.oneClassifyinfo = true;
      this.towClassifyinfo = false;
      this.form.categoryName = params.category_name;
      this.submittype = params.submittype;
      this.oneClassifyid = params.id;
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.infoclassdiv1,
.infoclassdiv2 {
  margin-left: 50px;
}
.infoclassbtn {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 10px;
  }
}
.infoclassdiv1 {
  div:first-child {
    &::before {
      top: 22px;
    }
  }
  div:last-child {
    &::before {
      bottom: 22px;
    }
  }
}
.infoclassnav {
  line-height: 44px;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 22px;
    bottom: 0px;
    width: 32px;
    border-left: 2px dotted #000;
  }
  h4 {
    padding-left: 40px;
    position: relative;
    i {
      position: absolute;
      top: 13px;
      left: 15px;
      font-size: 16px;
      background-color: #fff;
    }
  }
  ul {
    top: 35px;
    li {
      font-weight: 900;
      margin-left: 24px;
      padding-left: 36px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 21px;
        left: 0px;
        width: 32px;
        border-bottom: 2px dotted #000;
      }
    }
  }
  h4:hover,
  li:hover {
    background-color: #ebebef;
    transition: 0.5s;
  }
  h4:hover .nfoclassnavbtn,
  li:hover .nfoclassnavbtn {
    display: block;
  }
  h4:hover i {
    background-color: #ebebef;
    transition: 0.5s;
  }
  .nfoclassnavbtn {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
  }
}
.infoclassdiv2 {
  h4 {
    line-height: 44px;
    background-color: #ebebef;
    box-sizing: border-box;
    margin-right: 20px;
    padding: 0 20px;
  }
  .infoclassdiv2inputfrom {
    width: 400px;
    height: 200px;
    box-sizing: border-box;
    padding: 0 20px;
    margin-top: 20px;

    ::v-deep .el-form-item__label {
      font-size: 12px;
    }
    .el-button {
      font-size: 12px;
    }
  }
}
</style>
