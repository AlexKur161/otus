import { createStore } from 'vuex'
import axios from 'axios'
export const store = createStore({
    state () {
      return {
        ProductList: [],
        filterList: [],
        nameFilter: ''
      }
    },
    mutations: {
      setProductList (state, data) {
        state.ProductList = data;
        state.filterList = data;
      },
      setnameFilter(state, data) {
        state.nameFilter = data;
      },
      searchHeader (state, data) {
        console.log(data)
        state.filterList = state.ProductList
        .filter(item => item.title.toLowerCase().includes(state.nameFilter.toLowerCase()));
        console.log(state.filterList.filter
          (item => item.price > 0 ))
        if (data.maxPrice !== 0) {
          state.filterList = state.filterList.filter
          (item => (item.price > data.minPrice) && (item.price < data.maxPrice) )
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
      },
      getNameFilter(state) {
        return state.nameFilter;
      }
    }
})