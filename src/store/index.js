import { createStore } from 'vuex'
import basket from '../store/basket'
import authorization from '../store/authorization.js'
import productFilters from '../store/productFilters.js'
export const store = createStore({
    modules: {
      basket,
      authorization,
      productFilters
    }
})