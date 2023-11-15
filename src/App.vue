<template>
  <div class="wrapper_shop">
  <Header />
  <div class="main">
    <h1>{{ test  }}</h1>
  </div>
  <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { ref } from 'vue'

const test = ref('тест');

</script>



<style scoped>
</style>
