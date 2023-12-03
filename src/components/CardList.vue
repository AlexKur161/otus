<template>
  <div class="main_list">
    <div class="filter-wrap">
      <FiltersProduct />
    </div>
  <div class="card-wrap">
    <Card
      v-if="productList.length > 0"
      v-for="product in productList"
      :product-card="product"
      :key="product.id"
    />
    <div v-else class="no_product">Продуктов соотвествующих вашему поиску не найдено</div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"/>
  </div>
</div>
</template>
<script></script>
<script setup>
  import Loading from 'vue-loading-overlay';
  import { useStore } from 'vuex'
  import Card from './Card.vue'
  import FiltersProduct from './filtersProduct.vue'
  import { onMounted, reactive, ref, computed } from 'vue'

  let productList = reactive([])
  const isLoading = ref(false)
  const fullPage = ref(true)
  const store = useStore()

  productList = computed(() => store.getters.getFilterList)

  onMounted(async() => {
    isLoading.value = true;
    await store.dispatch('setProductListAction')
    isLoading.value = false;
  })
</script>
<style>
.main_list {
  display: flex;
  justify-content: space-between;
}
.card-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: flex-end;
}
.no_product {
  margin: auto;
  font-size: 24px;
}
.filter-wrap{
  max-width: 250px;
}
</style>