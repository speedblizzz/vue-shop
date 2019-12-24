import Vue from 'vue'
import VueRouter from 'vue-router'
import Shop from '../views/Shop.vue'
import ShopProduct from '../views/ShopProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shop',
    component: Shop
  },
  {
    path: '/:id',
    name: 'shopProduct',
    component: ShopProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
