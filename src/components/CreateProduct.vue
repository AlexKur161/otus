<template>
    <button @click="goPrev">вернуться в каталог</button>
<div>форма добавить продукт</div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['linkPrev'])

const goPrev = function() {
    emit('linkPrev');
}
</script>

<style>

</style>