import Vue from 'vue'
import Router from 'vue-router'
import HomeZh from '@/pages/home/homeZh'
import HomeEn from '@/pages/home/homeEn'
import ResumeZh from '@/pages/resume/resumeZh'
import ResumeEn from '@/pages/resume/resumeEn'
import Recho from '@/pages/recho/recho'
import RechoHome from '@/pages/recho/pages/home/recho-home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeZh',
      component: HomeZh,
    },
    {
      path: '/resume',
      name: 'resumeZh',
      component: ResumeZh,
    },
    {
      path: '/en',
      name: 'homeEn',
      component: HomeEn,
    },
    {
      path: '/en/resume',
      name: 'resumeEn',
      component: ResumeEn,
    },
    {
      path: '/recho',
      component: Recho,
      children: [
				{
					path: '',
					name: 'recho-home',
					component: RechoHome,
				},
      ],
    },
  ]
})
