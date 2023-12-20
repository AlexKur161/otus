<template>
  <div>
    <h2>Корзина</h2>
    <div class="basket_wrap">
      <div class="flex_product">
        <div v-for="product in basketList" class="product_wrap">
          <div class="wrap_img">
            <img class="img_product" :src="product?.image" alt="">
          </div>
          <div class="wrap_info">
            <h3>{{ product?.title }}</h3>
            <p>Доставка после покупки</p>
          </div>
          <div class="flex_height">
            <div class="wrap_add_product">
              <button class="btn_add_product">
                <svg class="quantity_disable" xmlns="http://www.w3.org/2000/svg" width="16px" height="24px" viewBox="0 0 24 24" fill="none">
                  <path class="quantity_disable" d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <p class="quantity_number">1</p>
              <button class="btn_add_product">
                <svg class="quantity_active" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="24px" xml:space="preserve">
                  <g><path d="M384,265H264v119h-17V265H128v-17h119V128h17v120h120V265z"/></g>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex_height">
            <p class="price">{{product?.price}} $</p>
          </div>
          <div class="delete_product">
            <button class="delete_btn"><img class="heart" src="/heart.svg" alt="heart"></button>
            <button class="delete_btn"><img class="delete" src="/delete.svg" alt="delete"></button>
          </div>
        </div>
      </div>
      <div class="wrap_price_full">
        <div class="price_total">
          <p>Итого:</p>
          <p>{{ totalPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const totalPrice = ref(0);
const basketList = computed(() => store.getters.getBasketList);

watch(basketList, () => {
  console.log('сработал');
  console.log(basketList);
  totalPrice.value = basketList.value.reduce((total, product) => {
    console.log('total', total)
  return total + product.price
  }, 0)
}, { immediate: true })
</script>

<style scope>
.basket_wrap{
  margin-top: 40px;
  border-radius: 20px;
    box-shadow: 0 8px 24px 0 rgba(8,9,10,.08);
    margin-bottom: 32px;
    padding: 24px;
}
.flex_product{
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.product_wrap{
  display: flex;
  gap: 40px;
}
.wrap_img{
  width: 100px;
  height: 100px;
}
.img_product{
  width: 100%;
  height: 100%;
}
.wrap_info{
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.quantity_active{
  fill: #8000FF;
  stroke: #8000FF;
}
.quantity_disable{
  fill: grey;
  stroke: grey;
}
.btn_add_product{
  border: none;
  background: none;
  height: 24px;
}
.wrap_add_product{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
  background-color: #f2f5f7;
  height: 36px;
  gap: 15px;
  padding: 0 15px;
}
.quantity_number{
  color: #8000FF;
  font-size: 22px;
  line-height: 100%;
  height: 24px;
}
.flex_height{
  display: flex;
  align-items: center;
}
.price{
  line-height: 100%;
    font-size: 20px;
    margin-bottom: 3px;
    min-width: 70px;
}
.delete_product{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
}
.heart{
  width: 16px;
  height: 16px;
}
.delete {
  width: 16px;
  height: 16px;
}
.delete_btn{
  background: none;
  border: none;
}
</style>