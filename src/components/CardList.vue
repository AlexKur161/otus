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
  import { useStore } from 'vuex'
  import Card from './Card.vue'
  import { useSearch } from '../nameSearch.js'
  import { onMounted, reactive, ref, computed } from 'vue'

  const { search } = useSearch();
  let productList = reactive([])
  const isLoading = ref(false)
  const fullPage = ref(true)
  const store = useStore()

  productList = computed(() => store.getters.getProductList)

  onMounted(async() => {
    isLoading.value = true;
    await store.dispatch('setProductListAction')
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