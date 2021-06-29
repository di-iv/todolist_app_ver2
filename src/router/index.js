import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Note from '../views/Note.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/New.vue')
  },
  {
    path: '/:index',
    name: 'note',
    component: Note
  },
  {
    path: '/*/',
    name: 'note found',
    redirect: {name: 'Home'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
