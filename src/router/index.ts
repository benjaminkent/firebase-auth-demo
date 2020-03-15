import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/authenticate-yoself',
    name: 'auth',
    component: () =>
      import(/* webpackChunkName: "AuthLayout" */ '../views/AuthLayout.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
