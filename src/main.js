/**
 * This file is the main entry point for our web app. Whenever the user loads the web page this file gets executed.
 */

// Import runtime
import Vue from 'vue'
// Import main App component
import App from './App.vue'
// Import service worker for performance improvements
import './registerServiceWorker'
// Import router to manage different views and routes
import router from './router'
// Import centralized store to share a common state accorss all components
import store from './store'
// Import material components and required style sheets
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// Import validation library to validate forms
import Vuelidate from 'vuelidate'

// Bind Vue to the window object
Window.Vue = Vue;

Vue.config.productionTip = false

// Bind the material components and validation library to our vue runtime
Vue.use(VueMaterial);
Vue.use(Vuelidate);

/**
 * Create the vue runtime and mount on the div#app in our index.html
 */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
