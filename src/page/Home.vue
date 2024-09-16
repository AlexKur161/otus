<template>
  <div>
    <CardList v-if="!basketShow"/>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import CardList from '../components/CardList.vue'

const basketShow = ref(false);
</script>

<style scoped>

</style>