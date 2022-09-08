// 引入vue
import Vue from "vue";
// 引入vue 3.0 体验版
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
// 引入路由
import router from "./router";
// 引入路由Token
import './router/loginToken'
// 引入vueX
import store from "./store";
// 引入css全局样式
import "./styles/main.scss";
// 引入Cookies 存储
import Cookies from "js-cookie";
// 引入ElementUI插件
import ElementUI from 'element-ui';
// 引入ElementUI css 样式
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events'
// 引入globalMethod 全局方法
import globalMethod from "./reuse/globalMethod"
// 把Cookies 挂载到vue 原型
Vue.prototype.$cookie = Cookies;
// 关闭生产模式下给出的提示
Vue.config.productionTip = false;
// 通过全局方法使用插件ElementUI插件
Vue.use(ElementUI);
// 通过全局方法使用globalMethod
Vue.use(globalMethod);
// 通过全局方法使用插件VueCompositionApi插件
Vue.use(VueCompositionApi);
// 创建vue实例对象
new Vue({
  router,
  store,
  // render函数的作用就是返回一个虚拟dom，将该虚拟dom渲染成真实的dom
  render: (h) => h(App), //createElement 创建虚拟DOM
}).$mount("#app"); //手动挂载到id为app的dom中的意思 该方法是直接挂载到入口文件index.html 的 id=app 的dom 元素上的