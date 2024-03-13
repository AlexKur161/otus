import { createStore } from 'vuex'
import { describe, expect, it } from 'vitest';

describe('increment mutation', () => {
    it('setBasket', () => {
    const store = createStore({
      state: {
        basketList: []
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
          }
      }
    })
  
    store.commit('setBasket')
  
    expect(store.state.basketList.length).toBe(1);
})
  })
  