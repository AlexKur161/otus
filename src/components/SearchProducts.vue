<template>
  <div class="search_wrap">
    <div class="wraper_inp">
        <input placeholder="Поиск товара" class="inp_search" v-model="search" type="text">
        <button class="btn_search">
            <img class="btn_img" src="/search.svg" alt="search">
        </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch} from 'vue'
import { useSearch } from '../nameSearch.js'

const { search } = useSearch();

//  const test = watch(search, (newValue) => {
//     console.log('chf,jnfl')
//     changeSearch(newValue);
//  })
</script>

<style scoped>
.search_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.inp_search{
    display: block;
    border-radius: 15px;
    outline: none;
    border: none;
    height: 40px;
    width: 400px;
    padding: 0 10px;
}
.wraper_inp{
    position: relative;
}
.btn_search{
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    width: 40px;
    border-radius: 0 15px 15px 0;
    border: none;
}
.btn_img {
    height: 25px;
}
</style>