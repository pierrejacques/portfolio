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
    isEnglish: false, // 页面中英文
    isBigViewOpen: false, // portfolio是否查看大图
    bigUrl: undefined, // 大图图片链接
		isBlur: false, // 主页面是否模糊
		pageUrl: undefined, // 大图跳转链接
    isRechoMenuAvailable: true, // recho菜单是否可用
  },
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
