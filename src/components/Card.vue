<template>
    <div class="card">
        <div class="img-wrap">
            <img class="img-card" :src="productCard?.image" alt="">
        </div>
        <div class="description-wrap">
          <div>
            <p class="price-card">{{ productCard?.price }} $</p>
            <p class="name-product">{{ productCard?.title }}</p>
            <p class="description-product">{{ productCard?.description }}</p>
          </div>
          <div class="add_basket_wrap">
            <button @click="dialogState = true" class="btn_basket_wrap">Заказать</button>
          </div>
          <div class="category-rating">
              <div class="rating-wrap">
                <img class="icon-star" src="/star.svg" alt="rating">
                <p class="rating_number">{{productCard?.rating.rate}}</p>
              </div>
              <div class="category-wrap">
                <p class="category-title">{{productCard?.category}}</p>
              </div>
          </div>
        </div>
        <GDialog v-model="dialogState" max-width="450">
          <OrderProduct />
        </GDialog>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import OrderProduct from './OrderProduct.vue'
defineProps({
  productCard: {
    type: Object,
    default: {
      category:'',
      description:'',
      image:'',
      price: 0,
      rating: {
        rate: ''
      },
      title:''
    }
  }
})

const dialogState = ref(false);
</script>

<style>
.card {
  padding: 20px;
  width: calc(1214px / 4);
  height: 450px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(36,36,36,.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.9s;
  scale: 1;
}
.card:hover{
  transition: 0.9s;
  z-index: 999;
  scale: 1.1;
}
.add_basket_wrap {
  display: flex;
  scale: 0;
  justify-content: center;
  padding: 10px 0;
}
.card:hover .add_basket_wrap{
  scale: 1;
}
.btn_basket_wrap{
  background: #fff;
  color: #8000FF;
  border: 1px solid #8000FF;
  border-radius: 24px;
  padding: 10px 20px;
  opacity: 0;
}
.btn_basket_wrap:hover{
  background: #8000FF;
  color: #fff;
}
.card:hover .btn_basket_wrap{
  transition: 0.9s;
  z-index: 999;
  scale: 1.1;
  opacity: 1;
}
.img-wrap{
  width: 100%;
  height: 200px;
}
.img-card {
  width: 100%;
  height: 100%;
}
.description-wrap{
  flex-grow: 1;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price-card{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}
.name-product {
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description-product{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.category-rating{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating-wrap{
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon-star {
  width: 14px;
}

</style>