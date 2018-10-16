import Vue from 'vue'
import Router from 'vue-router'
import elementTest from '@/components/elementTest'
import login from '@/components/login'
import resource from '@/components/admin/resource'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/elementTest',
      name: 'elementTest',
      component: elementTest
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/resource',
      name: 'resource',
      component: resource
    }
  ]
})
