import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import elementTest from '@/components/elementTest'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
