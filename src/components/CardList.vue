<template>
  <div class="card-wrap">
    <Card v-for="product in fetchProducts" :product-card="product" :key="product.id"/>
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
  import { useListProducts } from '../composable/services.js'
  import { onMounted, reactive, ref } from 'vue'

  let isLoading = ref(false)
  let fullPage = ref(true)
  const { fetchProducts } = useListProducts()

  onMounted(async() => {
    isLoading.value = true;
    await useListProducts();
    isLoading.value = false;
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