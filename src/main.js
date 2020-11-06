import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Window.Vue = Vue;

Vue.config.productionTip = false

Vue.use(VueMaterial);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
