import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './stores'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

