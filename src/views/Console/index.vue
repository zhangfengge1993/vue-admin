<template>
  <el-container class="home-container">
    <el-header>
      <div class="headerdiv1">
        <span>后台管理系统</span>
      </div>
      <div class="headerdiv2">
        <span class="username">用户: {{ username }}</span>
        <el-button type="info" @click="out"><span>退出</span></el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse ? '64px' : '180px'">
        <div class="togglebutton" @click="toggleCollp">
          <i :class="iscollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#303133"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="iscollapse"
          :collapse-transition="false"
          :unique-opened="true"
          :router="true"
        >
          <template v-for="(item, index) in routeslist">
            <el-submenu v-if="!item.isshow" :index="index + ''" :key="item.id">
              <template slot="title">
                <i :class="iconlist[item.meta ? item.meta.icon : '']"></i>
                <span>{{ item.meta ? item.meta.title : "" }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="i.path"
                  v-for="i in item.children"
                  :key="i.id"
                >
                  <i class="el-icon-menu"></i>
                  {{ i.meta ? i.meta.title : "" }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card class="box-card"> <router-view></router-view></el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getiscollapse, setiscollapse } from "../../reuse/tokenapi";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      // 获取路由列表名称
      routeslist: this.$router.options.routes,
      //   菜单图标
      iconlist: {
        125: "el-icon-user-solid",
        103: "el-icon-s-tools",
        101: "el-icon-goods",
        102: "el-icon-tickets",
        145: "el-icon-picture",
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {
    username() {
      return this.$store.state.login.user_name;
    },
    iscollapse: {
      get() {
        return this.$store.state.login.iscollapse;
      },
      set(newValue) {
        this.$store.state.login.iscollapse = newValue;
      },
    },
  },
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
    //   退出
    out() {
      this.$store.commit("login/OUT");
      this.$router.push("/login");
    },
    // 折叠按钮
    toggleCollp() {
      this.$store.commit("login/set_iscollapse");
      let togglebutton = document.querySelector(".togglebutton");
      if (this.iscollapse) {
        togglebutton.style.paddingRight = "22px";
      } else {
        togglebutton.style.paddingRight = "16px";
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.home-container {
  height: 100%;
}
.el-header {
  background: #303133;
  padding: 40px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .headerdiv1 {
    display: flex;
    align-items: center;
    span {
      font-size: 18px;
      font-weight: 900;
      color: #fff;
    }
  }
  .headerdiv2 {
    display: flex;
    align-items: center;
    .username {
      margin-right: 50px;
      font-size: 14px;
      font-weight: 900;
      color: #fff;
    }
  }
  .el-button {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 12px;
    }
  }
}
.el-aside {
  background: #303133;
  transition: 1s;
  .el-menu {
    border: 0;
  }
}
.togglebutton {
  height: 40px;
  display: flex;
  justify-content: right;
  align-items: center;
  box-sizing: border-box;
  padding-right: 16px;

  i {
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
}
.el-main {
  background: #ededf1;
}
::v-deep .el-menu-item,
::v-deep .el-submenu__title {
  font-size: 12px;
  font-weight: 900;
}
.box-card {
  height: 100%;
}
</style>
