<template>
  <div class="wrapper_shop">
  <Header />
  <div class="main">
    <CardList />
  </div>
  <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import CardList from './components/CardList.vue'
import { ref } from 'vue'

const test = ref('тест');

</script>



<style scoped>
</style>
