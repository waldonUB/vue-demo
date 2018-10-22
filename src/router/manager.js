import Vue from 'vue'
import Router from 'vue-router'
import Resource from '@/components/admin/Resource'
import LeftMenu from '@/components/system/LeftMenu'
import BMap from '@/components/user/BMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin/Resource',
      name: 'Resource',
      component: Resource
    },
    {
      path: '/system/LeftMenu',
      name: 'LeftMenu',
      component: LeftMenu
    },
    {
      path: '/user/BMap',
      name: 'BMap',
      component: BMap
    }
  ]
})
