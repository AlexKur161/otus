<template>
  <div class="search_wrap">
    <div class="wraper_inp">
        <input placeholder="Поиск товара" class="inp_search" v-model="search" type="text">
        <button @click="searchName" class="btn_search">
            <img class="btn_img" src="/search.svg" alt="search">
        </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch} from 'vue'
import { useStore } from 'vuex';


const search = ref('');
const store = useStore()

const nameFilter = computed(() => store.getters.getNameFilter)

watch(nameFilter, () => {
console.log('onUpdate сработал');
search.value = nameFilter.value;
})

function searchName() {
    store.commit('setnameFilter', search.value);
    store.commit('searchHeader', {});
}
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
    border-radius: 24px;
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
    right: 3px;
    top: 0;
    top: 50%;
    transform: translate( 0, -50%);
    height: 34px;
    width: 34px;
    border: none;
    border-radius: 90px;
    background:  #8000FF;
}
.btn_img {
    height: 20px;
    fill: white;
}
</style>