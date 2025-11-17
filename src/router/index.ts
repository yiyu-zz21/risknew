import { createRouter, createWebHashHistory } from 'vue-router'
import { useCalculatorStore } from '@/stores/calculator'
import { ROUTES } from '@/utils/constants'

// 路由组件定义 - 将在后面创建这些组件
// import HomeView from '@/views/HomeView.vue'
import PDACView from '@/components/views/PDACView.vue'
import DCCView from '@/components/views/DCCView.vue'
import AACView from '@/components/views/AACView.vue'

const routes = [
  {
    path: '/',
    redirect: ROUTES.PDAC
  },
  {
    path: ROUTES.PDAC,
    name: 'PDAC',
    component: PDACView,
    meta: {
      title: 'PDAC'
    }
  },
  {
    path: ROUTES.DCC,
    name: 'DCC',
    component: DCCView,
    meta: {
      title: 'DCC'
    }
  },
  {
    path: ROUTES.AAC,
    name: 'AAC',
    component: AACView,
    meta: {
      title: 'AAC'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 可以在这里添加路由守卫逻辑
  next()
})

export default router