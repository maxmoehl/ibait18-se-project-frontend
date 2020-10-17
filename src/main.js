import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import AsyncComputed from 'vue-async-computed'

Window.Vue = Vue;

Vue.config.productionTip = false

Vue.use(AsyncComputed);
Vue.use(VueMaterial);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
