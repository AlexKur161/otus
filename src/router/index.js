import { createRouter, createWebHistory } from "vue-router";
import Home from '/src/page/Home.vue'
import Product from '/src/page/Product.vue'
import createProduct from '/src/page/CreateProduct.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/createProduct',
      name: 'createProduct',
      component: createProduct
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    }
  ]
})

export default router

