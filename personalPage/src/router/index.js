import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Recho from '@/pages/recho/recho'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/recho',
      name: 'recho',
      component: Recho,
    }
  ]
})
