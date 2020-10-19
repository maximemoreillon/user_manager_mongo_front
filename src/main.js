import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false



let identity_check = () => {
  Vue.axios.get(`${process.env.VUE_APP_AUTHENTICATION_API_URL}/whoami`)
  .then( response => { store.commit('set_current_user', response.data) })
  .catch( error => { console.error(error) })
}

router.beforeEach((to, from, next) => {

  let token = Vue.$cookies.get("token")

  if(token) {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    identity_check()
    next()
  }
  else {
    delete Vue.axios.defaults.headers.common['Authorization']
    if (to.name !== 'login') next({ name: 'login' })
    else next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
