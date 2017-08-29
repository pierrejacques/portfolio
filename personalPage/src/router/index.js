import Vue from 'vue'
import Router from 'vue-router'
import HomeZh from '@/pages/home/homeZh'
import HomeEn from '@/pages/home/homeEn'
import ResumeZh from '@/pages/resume/resumeZh'
import ResumeEn from '@/pages/resume/resumeEn'
import Recho from '@/pages/recho/recho'
import RechoHome from '@/pages/recho/pages/home/home.vue'
import RechoLogin from '@/pages/recho/pages/login/login.vue'
import RechoStart from '@/pages/recho/pages/get-started/get-started.vue'
import RechoConfirm from '@/pages/recho/pages/confirm/confirm.vue'
import RechoTutorList from '@/pages/recho/pages/tutor-list/tutor-list.vue'
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
        {
          path: 'login',
          name: 'recho-login',
          component: RechoLogin,
        },
        {
          path: 'getstarted',
          name: 'recho-start',
          component: RechoStart,
        },
        {
          path: 'confirm',
          name: 'recho-confirm',
          component: RechoConfirm,
        },
        {
          path: 'tutor-suggest',
          name: 'recho-tutor-list',
          component: RechoTutorList,
        },
      ],
    },
  ]
})
