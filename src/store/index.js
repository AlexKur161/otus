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
        if (data.maxPrice !== 0 && data.maxPrice !== undefined) {
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
      },
      sendOrder({commit}, order) {
        axios.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(order))
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      },
      setProductCreateAction({commit}, data) {
        axios.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(data))
        .then(response => {
          console.log(response);
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