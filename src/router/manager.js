import Vue from 'vue'
import Router from 'vue-router'
import BMap from '@/components/manager/user/BMap'

Vue.use(Router)

export default [
  {
    path: '',
    component: BMap
  },
  {
    path: 'user/BMap',
    component: BMap
  },
  {
    path: 'system/LeftMenu',
    component: BMap
  }
]
