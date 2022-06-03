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
          title: '主页',
        }
      },
      {
        path: "/main2",
        name: "main2",
        component: () => import("../views/Console/main/index2.vue"),
        meta: {
          title: '主页',
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