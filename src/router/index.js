import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Resource from '@/components/admin/Resource'
import LeftMenu from '@/components/system/LeftMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/Resource',
      name: 'Resource',
      component: Resource
    },
    {
      path: '/system/LeftMenu',
      name: 'LeftMenu',
      component: LeftMenu
    }
  ]
})
