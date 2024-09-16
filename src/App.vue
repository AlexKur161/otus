<template>
  <div class="wrapper_shop">
    <Header />
    <div class="main">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Header from '/src/components/Header.vue'
import Footer from '/src/components/Footer.vue'
import CardList from '/src/components/CardList.vue'
</script>



<style scoped>
</style>
