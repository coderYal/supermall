import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const CateGory = () => import('views/category/CateGory')
const Cart = () => import('views/cart/Cart')
const Mine = () => import('views/mine/Mine')


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: CateGory
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/mine',
    component: Mine
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
