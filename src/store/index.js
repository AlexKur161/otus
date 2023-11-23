import { createStore } from 'vuex'
import axios from 'axios'
export const store = createStore({
    state () {
      return {
        ProductList: []
      }
    },
    mutations: {
      setProductList (state, data) {
        state.ProductList = data;
      }
    },
    actions: {
      setProductListAction({state, commit}) {
        axios.get('https://fakestoreapi.com/products')
      .then(response => {
        commit('setProductList', response.data);
      })
    .catch(error => {
      console.log(error);
    });
        }
      },
    getters: {
      getProductList(state) {
        return state.ProductList
      }
    }
})