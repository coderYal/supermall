import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const CateGory = () => import('views/category/CateGory')
const Cart = () => import('views/cart/Cart')
const Mine = () => import('views/mine/Mine')
const Detail = () => import('views/detail/Detail')

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
  },
  {
    //  配置动态路由
    path: '/detail/:id',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
