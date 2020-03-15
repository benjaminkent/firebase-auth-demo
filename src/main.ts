import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import Vuelidate from 'vuelidate'

Vue.use(VueCompositionApi)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
