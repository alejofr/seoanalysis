import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { routes } from './routes.js'

Vue.use(VueRouter);
Vue.use(VueAxios, axios)

axios.defaults.baseURL = process.env.VUE_APP_RUTA_API;

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
