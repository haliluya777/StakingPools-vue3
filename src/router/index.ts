import { createRouter,createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '',
  //   redirect: (_) => {
  //     return { path: '/about' }
  //   },
  // },
  {
    path: `/home`,
    name: 'Home',
    component: () =>
      import('../view/Home.vue'),
  },
  
  {
    path: `/owner/:type`,
    name: 'Owner',
    component: () =>
    import('../view/Owner.vue'),
  },
  {
    path: '/user/:type',
    name: 'User',
    component: () =>
      import('../view/User.vue'),
  },
  
  {
    path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
    redirect: (_) => {
      return { path: '/home' }
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})
export default router