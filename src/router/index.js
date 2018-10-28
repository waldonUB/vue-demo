import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Manager from '@/components/Manager'
import manager from '@/router/manager' // 子路由
import Page404 from '@/components/system/Page404'

Vue.use(Router)

const appRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/manager/',
      component: Manager,
      children: manager
    },
    {
      path: '/Page404',
      name: 'Page404',
      component: Page404
    }
  ]
})
appRouter.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({name: from.name}) : next('/Page404')
  } else {
    next() // 匹配到正确的路由就跳转
  }
})
export default appRouter
