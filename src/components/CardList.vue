<template>
  <div class="card-wrap">
    <Card v-for="product in productList" :product-card="product" :key="product.id"/>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"/>
  </div>
</template>
<script></script>
<script setup>
  import Loading from 'vue-loading-overlay';
  import Card from './Card.vue'
  import { onMounted, reactive, ref } from 'vue'

  let productList = reactive([])
  let isLoading = ref(false)
  let fullPage = ref(true)

  onMounted(() => {
    isLoading.value = true;
    fetch('https://fakestoreapi.com/products')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    productList = data
    isLoading.value = false;
  });
  })
</script>
<style>
.card-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}
</style>