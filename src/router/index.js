import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [{
    path: "/",
    redirect: 'login',
    isshow: true
  },
  {
    path: "/login",
    name: "login",
    isshow: true,
    component: () => import("../views/login/index.vue"),
    meta: {
      title: '登陆'
    }
  },
  {
    path: "/console",
    name: "console",
    redirect: '/main',
    component: () => import("../views/Console/index.vue"),
    meta: {
      title: '控制台',
      icon: '125'
    },
    children: [{
        path: "/main",
        name: "main",
        component: () => import("../views/Console/main/index.vue"),
        meta: {
          title: '主页1',
        }
      },
      {
        path: "/main2",
        name: "main2",
        component: () => import("../views/Console/main/index2.vue"),
        meta: {
          title: '主页2',
        }
      },

    ]
  },
  {
    path: "/message",
    name: "message",
    redirect: '/messagelist',
    component: () => import("../views/Console/index.vue"),
    meta: {
      title: '信息管理',
      icon: '103'
    },
    children: [{
        path: "/messagelist",
        name: "messagelist",
        component: () => import("../views/messages/messagelist.vue"),
        meta: {
          title: '信息列表',
        }
      },
      {
        path: "/messageclassify",
        name: "messageclassify",
        component: () => import("../views/messages/messageclassify.vue"),
        meta: {
          title: '信息分类',
        }
      },
    ]
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;