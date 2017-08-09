// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuex from 'vuex'
import App from './App'
import router from './router'

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(vuex)
const store = new vuex.Store({
  state: {
    isBigViewOpen: false,
    bigUrl: undefined,
		isBlur: false,
  },
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
