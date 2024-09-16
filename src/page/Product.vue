<template>
  <div>
    <div v-if="isLoading === false">
      <h3 class="product_title">{{product?.title}}</h3>
      <div class="product-wrap">
        <div class="img-product-wrap">
            <img class="img_product" :src="product?.image" alt="product">
        </div>
        <div class="discription-product-wrap">
          <div class="mini-wrap">
            <p class="disc_title">Категория:</p>
            <p>{{ product?.category}}</p>
          </div>
          <div class="mini-wrap">
            <p class="disc_title">Рейтинг:</p>
            <p>{{ product?.rating?.rate}}</p>
          </div>
          <div class="mini-wrap">
            <p class="disc_title">Оценили:</p>
            <p>{{ product?.rating?.count}}</p>
          </div>
          <div class="">
            <p class="disc_title desc_product">Описание</p>
            <p>{{ product?.description}}</p>
          </div>
        </div>
        <div class="price-wrap">
          <div>
            <div class="wrap_title_price">
              <p class="title_price">Цена:</p>
              <p class="price">{{ product?.price}}$</p>
            </div>
            <p class="grey-title">Оплата только онлайн</p>
            <button @click="addProductBasket" class="btn_filter">Добавить в корзину</button>
            <router-link to="/" class="btn_filter link_catalog">Вернуться в каталог</router-link>
          </div>
          <div class="rating-wrap">
            <img class="icon-star" src="/star.svg" alt="rating">
            <p class="rating_number">{{ product?.rating?.rate}}</p>
          </div>
        </div>
      </div>
    </div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, watch } from 'vue';
import Loading from 'vue-loading-overlay';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const isLoading = ref(true);
const fullPage = ref(true);
const product = ref({});
const store = useStore();
const route = useRoute()

const ProductList = computed(()=> store.getters.getFilterList);

watch(ProductList, () => {
  console.log(ProductList.value);
  console.log(route.params.id);
  product.value = ProductList.value.find(
    item => Number(item.id) === Number(route.params.id)
  );
  if(product.value) {
    isLoading.value = false;
  }
})

function addProductBasket() {
  store.commit('setBasket', product.value);
}
onBeforeMount(async () => {
  await store.dispatch('setProductListAction')
})
</script>

<style scoped>
.product_title {
  font-size: 26px;
  margin-bottom: 40px;
}
.img_product{
  max-width: 250px;
}
.product-wrap{
  display: flex;
  justify-content: space-between;
}
.disc_title{
  font-weight: 700;
}
.mini-wrap{
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}
.discription-product-wrap{
  max-width: 600px;
}
.desc_product{
  margin-bottom: 20px;
}
.price-wrap{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 24px 0 rgba(8,9,10,.08);
  background-color: #fff;
  border-radius: 24px;
  padding: 30px;
  transition: background-color .2s linear;
  width: 300px;
  height: 300px;
}
.wrap_title_price{
  display: flex;
  gap: 20px;
}
.title_price{
  font-size: 30px;
  font-weight: 700;
}
.price{
  font-size: 30px;
  font-weight: 700;
}
.grey-title{
  color: grey;
  margin-top: 10px;
}
.btn_filter {
	border-radius: 24px;
  outline: none;
  border: 1px solid #8000FF;
  height: 40px;
  width: 100%;
	background: none;
	font-size: 16px;
	transition: 0.4s;
	font-weight: 500;
  margin-top: 20px;
}
.btn_filter:hover {
	background: #8000FF;
	color: #fff;
	transition: 0.4s;
}
.rating-wrap{
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon-star {
  width: 14px;
}
.link_catalog{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>