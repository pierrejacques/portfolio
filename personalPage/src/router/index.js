import Vue from 'vue'
import Router from 'vue-router'
import HomeZh from '@/pages/home/homeZh'
import HomeEn from '@/pages/home/homeEn'
import ResumeZh from '@/pages/resume/resumeZh'
import ResumeEn from '@/pages/resume/resumeEn'
import Recho from '@/pages/recho/recho'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeZh',
      components: {
        default: HomeZh,
      }
    },
    {
      path: '/resume',
      name: 'resumeZh',
      components: {
        default: ResumeZh
      },
    },
    {
      path: '/en',
      name: 'homeEn',
      components: {
        default: HomeEn
      },
    },
    {
      path: '/en/resume',
      name: 'resumeEn',
      components: {
        default: ResumeEn
      },
    },
    {
      path: '/recho',
      name: 'recho',
      components: {
        default: Recho
      },
      children: [
      ],
    },
  ]
})
