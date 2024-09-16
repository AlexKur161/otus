<template>
  <div>
    <h2>Корзина</h2>
    <div v-if="basketList.length > 0" class="basket_wrap">
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
              <button
               :disabled="product.quantity < 2 || product.quantity === undefined"
                @click="deleteQuantity(product)"
                class="btn_add_product"
              >
                <svg class="quantity_disable" xmlns="http://www.w3.org/2000/svg" width="16px" height="24px" viewBox="0 0 24 24" fill="none">
                  <path class="quantity_disable" d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <p v-if="product.quantity === undefined" class="quantity_number">1</p>
              <p v-else class="quantity_number">{{ product?.quantity }}</p>
              <button @click="addQuantity(product)" class="btn_add_product">
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
            <button @click="deleteSelectedProduct(product)" class="delete_btn"><img class="delete" src="/delete.svg" alt="delete"></button>
          </div>
        </div>
      </div>
      <div class="wrap_price_full">
        <div class="price_total">
          <p class="title_price_total">Итого:</p>
          <p class="title_price_total">{{ totalPrice }} $</p>
        </div>
        <button
          @click="dialogState = true"
          class="btn_filter">
          Оформить заказ
        </button>
        <button
          @click="clearBasket"
          class="btn_filter">
          Очистить корзину
        </button>
        <router-link to="/" class="btn_filter">Вернуться в каталог</router-link>
      </div>
    </div>
    <div v-else class="no_data">
      <p class="no_data_title">В корзине не продуктов</p>
    </div>
    <GDialog v-model="dialogState" max-width="450">
      <OrderProduct @dialogShow="dialogClosed" />
    </GDialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import OrderProduct from '../components/OrderProduct.vue'

const store = useStore();

const dialogState = ref(false);
const basketList = computed(() => store.getters.getBasketList);

const totalPrice = computed(()=> {
  const total = basketList.value.reduce((total, product) => {
     console.log('total', total);
     if(product.quantity){
       return total + (product.price * product.quantity);
     }else {
       return total + product.price;
     }
   }, 0).toFixed(2);
   return total
})

function dialogClosed(condition) {
  dialogState.value = condition;
}

function clearBasket() {
  store.commit('clearBasket');
}

function addQuantity(product) {
  if(product.quantity) {
    product.quantity++
  }else{
    product.quantity = 2;
  }
}

function deleteQuantity(product) {
  product.quantity--;
}

function deleteSelectedProduct(product) {
  console.log('продукт', product)
  store.commit('deleteProduct', product);
}

</script>

<style scope>
.no_data_title{
  font-size: 24px;
  margin-top: 20px;
}
.basket_wrap{
  margin-top: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 24px 0 rgba(8,9,10,.08);
  margin-bottom: 32px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
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
.price_total{
  display: flex;
  justify-content: space-between;
}
.delete_btn{
  background: none;
  border: none;
}
.title_price_total{
  font-size: 34px;
  font-weight: 700;
}
.btn_filter {
  display: flex;
  justify-content: center;
  align-items: center;
	border-radius: 24px;
  outline: none;
  border: 1px solid #8000FF;
  height: 40px;
  width: 300px;
	background: none;
	font-size: 16px;
	transition: 0.4s;
	font-weight: 500;
}
.btn_filter:hover {
	background: #8000FF;
	color: #fff;
	transition: 0.4s;
}
.wrap_price_full{
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
}
</style>