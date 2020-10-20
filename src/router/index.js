import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: false
  },

  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dishInput',
    name: 'goods',
    meta: {
      title: '菜品和套餐',
      icon: 'caipinguanli'
    },
    children: [
      {
        path: 'dishInput',
        name: 'dishInput',
        meta: { title: '菜品管理' },
        component: () => import('@/views/goods/dish/index')
      },
      {
        path: 'packageInput',
        name: 'packageInput',
        meta: { title: '套餐管理' },
        component: () => import('@/views/goods/package/index')
      }
    ]
  },
  {
    path: '/orderManagement',
    component: Layout,
    name: 'orderManagement',
    meta: { title: '订单管理', icon: 'layer' },
    children: [
      {
        path: 'orderEdit',
        name: 'orderEdit',
        component: () => import('@/views/orderManagement/orderEdit/index'),
        meta: { title: '订单修改' }
      },
      {
        path: 'orderSearch',
        name: 'orderSearch',
        component: () => import('@/views/orderManagement/orderEdit/index'),
        meta: { title: '订单查询' }
      }
    ]
  },
  {
    path: '/dataAnalysis',
    component: Layout,
    name: 'dataAnalysis',
    meta: { title: '销售分析', icon: 'fenxi' },
    children: [
      {
        path: 'numbers',
        name: 'numbers',
        component: () => import('@/views/dataAnalysis/index'),
        meta: { title: '数据分析' }
      },
      {
        path: 'charts',
        name: 'charts',
        component: () => import('@/views/dataAnalysis/index'),
        meta: { title: '图形分析' }
      }
    ]
  },
  {
    path: '/uerManagement',
    component: Layout,
    name: 'uerManagement',
    meta: { title: '用户管理', icon: 'yonghu' },
    children: [
      {
        path: 'systemUser',
        name: '系统用户',
        component: () => import('@/views/systemSettings/systemUserManagement/index'),
        meta: { title: 'Table', icon: 'luru' }
      },
      {
        path: 'basicData',
        name: '基础录入',
        component: () => import('@/views/systemSettings/basicDataManagement/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/systemManagement',
    component: Layout,
    name: 'systemManagement',
    meta: { title: '系统设置', icon: 'shezhi' },
    children: [
      {
        path: 'systemUser',
        name: 'systemUser',
        component: () => import('@/views/systemSettings/systemUserManagement/index'),
        meta: { title: '系统用户' }
      },
      {
        path: 'basicData',
        name: 'basicData',
        component: () => import('@/views/systemSettings/basicDataManagement/index'),
        meta: { title: '基础录入' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
