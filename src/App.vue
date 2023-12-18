<template>
  <div class="wrapper_shop">
  <Header @basket-emit="test"/>
  <div class="main">
    <CreateProduct @link-prev="prev" v-if="basketShow"/>
    <CardList v-if="!basketShow"/>
  </div>
  <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import CardList from './components/CardList.vue'
import CreateProduct from './components/CreateProduct.vue'
import { ref } from 'vue'

const basketShow = ref(false);

function test() {
  basketShow.value = true;
}
function prev() {
  basketShow.value = false;
}
</script>



<style scoped>
</style>
