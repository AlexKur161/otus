export default{
  state () {
    return {
      basketList: []
    }
  },
  mutations: {
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

  },

  getters: {
    getBasketList(state) {
      return state.basketList;
    },
    getQuantityBasket(state) {
      return state.basketList.length;
    }
  }
}