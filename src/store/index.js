import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import login from './modules/login'
import infoclassify from './modules/infoclassify'
import information from './modules/information'
import infodetails from './modules/infodetails'
export default new Vuex.Store({
  modules: {
    login,
    infoclassify,
    information,
    infodetails
  },
});