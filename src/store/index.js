import { createStore } from 'vuex'
import axios from 'axios'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/init.js'
export const store = createStore({
    state () {
      return {
        ProductList: [],
        filterList: [],
        nameFilter: '',
        user: {
          userName: null,
          accesToken: null,
          refreshToken: null
        },
        basketList: []
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
      },
      setEntranceSend(state, user) {
        state.user = user;
      },
      setBasket(state, product) {
        let repeatProduct = state.basketList.find(item => item.id === product.id)
        if(repeatProduct){
          if(repeatProduct.quantity === undefined) {
            repeatProduct.quantity = 2;
          }else {
            repeatProduct.quantity++
          }
        }else {
          state.basketList.push(product);
        }
      },
      clearBasket(state){
        state.basketList = [];
      },
      deleteProduct(state, product) {
        state.basketList = state.basketList.filter(item => item.id !== product.id);
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
      },
      setEntranceSendAction({commit}, data) {
        signInWithEmailAndPassword(auth, data.email, data.pass)
        .then((userCredential) => {
          console.log('зашел', userCredential);
          const user = {
            userName: userCredential._tokenResponse.displayName,
            accesToken: userCredential._tokenResponse.idToken,
            refreshToken: userCredential._tokenResponse.refreshToken
          }
          commit('setEntranceSend', user);
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch((error) => {
          console.log(error);
        })
      },
      setRegistrationSendAction({commit}, data) {
        createUserWithEmailAndPassword(auth, data.email, data.pass)
        .then((credential) => {
          updateProfile(auth.currentUser, {
            displayName: data.name
          }).then(()=> {
            console.log('credential',credential)
            const user = {
              userName: credential.user.displayName,
              accesToken: credential._tokenResponse.idToken,
              refreshToken: credential._tokenResponse.refreshToken
            }
          commit('setEntranceSend', user);
          localStorage.setItem('user', JSON.stringify(user));
          });
        })
        .catch((error) => {
          console.log(error);
        })
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
      },
      getUser(state) {
        return state.user;
      },
      getBasketList(state) {
        return state.basketList;
      },
      getQuantityBasket(state) {
        return state.basketList.length;
      }
    }
})