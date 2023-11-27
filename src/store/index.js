import { createStore } from 'vuex'
import axios from 'axios'
export const store = createStore({
    state () {
      return {
        ProductList: [],
        filterList: []
      }
    },
    mutations: {
      setProductList (state, data) {
        state.ProductList = data;
        state.filterList = data;
      },
      searchHeader (state, data) {
        console.log(data)
        state.filterList = state.ProductList
        .filter(item => item.title.toLowerCase().includes(data.name.toLowerCase()));
        if((data.minPrice !== undefined) && (data.maxPrice !== undefined)) {
          state.filterList = state.filterList.filter
          (item => (item.price > data.minPrice) && (item.price < data.minPrice) )
        }
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
        return state.ProductList;
      },
      getFilterList(state) {
        return state.filterList;
      }
    }
})