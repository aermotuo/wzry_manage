import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/user/login'
import register from '@/page/user/register'
import manage from '@/page/manage/index'
import personnel from '@/page/manage/statistics/personnel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children: [{
        path: 'personnel',
        name: 'personnel',
        component: personnel
      }]
    }
  ]
})
