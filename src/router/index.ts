import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index/index.vue')
  },
]

const router = createRouter({// 处理生产环境github上用的不是根目录的路由问题，history模式需要改项目nginx配置
  history: createWebHashHistory(process.env.NODE_ENV === 'production' ? '/vue-qiankun' : process.env.BASE_URL),
  routes
})

export default router
