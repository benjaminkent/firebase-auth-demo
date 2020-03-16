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
    path: '/class-auth',
    name: 'classAuth',
    component: () =>
      import(
        /* webpackChunkName: "ClassAuthLayout" */ '../views/ClassAuthLayout.vue'
      ),
  },
  {
    path: '/composition-auth',
    name: 'compositionAuth',
    component: () =>
      import(
        /* webpackChunkName: "CompositionAuthLayout" */ '../views/CompositionAuthLayout.vue'
      ),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
