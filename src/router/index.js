import { createRouter, createWebHistory } from "vue-router";
import Home from '/src/page/Home.vue'
import Product from '/src/page/Product.vue'
import createProduct from '/src/page/CreateProduct.vue'
import Authorization from '/src/page/Authorization.vue'
import Basket from '/src/page/Basket.vue'

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
      component: createProduct,
      beforeEnter(to, from, next) {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(!user)
        if(!user){
          console.log('zachel')
          return next({name: 'authorization'});
        }else{
          return next();
        }
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: Authorization
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket
    }
  ]
})

export default router

