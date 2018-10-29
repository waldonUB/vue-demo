import Vue from 'vue'
import Router from 'vue-router'
import BMap from '@/components/manager/user/BMap'
import InfoCenter from '@/components/manager/user/InfoCenter'
import Essay from '@/components/manager/user/Essay'
import EssayInfo from '@/components/manager/user/EssayInfo'

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
    path: 'user/InfoCenter',
    component: InfoCenter
  },
  {
    path: 'user/Essay',
    component: Essay
  },
  {
    path: 'user/EssayInfo',
    component: EssayInfo
  }
]
