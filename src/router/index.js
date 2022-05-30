import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/views/404')
  },
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登入'
    },
    component: () => import('@/views/Login')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '首頁'
    },
    component: () => import('@/views/Dashboard')
  },
  {
    path: '/procurement/addTender',
    name: 'AddTender',
    meta: {
      title: '新增招標'
    },
    component: () => import('@/views/Procurement/AddTender')
  },
  {
    path: '/procurement/tenderContent',
    name: 'TenderContent',
    meta: {
      title: '招標資料'
    },
    component: () => import('@/views/Procurement/TenderContent')
  },
  {
    path: '/vincent',
    name: 'Vincent',
    meta: {
      title: 'Vincent'
    },
    component: () => import('@/views/Vincent')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
