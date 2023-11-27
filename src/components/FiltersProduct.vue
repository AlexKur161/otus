<template>
  <div>
    <p class="filter_name main_name_filter">Отфильтровать продукты:</p>
    <p class="filter_name">По имени</p>
    <input
      v-model="search"
      placeholder="Введите название продукта"
      class="inp_search"
      type="text"
    >
    <p class="filter_name">По цене</p>
    <div class="range_price">
        <input v-model.number="minPrice" class="inp_search price" type="number">
        <input v-model.number="maxprice" class="inp_search price" type="number">
    </div>
		<button @click="searchName" class="btn_filter">Отфильтровать</button>
		<button class="btn_filter">Сбросить фильтры</button>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex';

const search = ref('');
const minPrice = ref();
const maxprice = ref();
const store = useStore();

const filtersData = computed(() => {
	const filtersProduct = {};
	filtersProduct.name = search.value;
	filtersProduct.minPrice = minPrice.value;
	filtersProduct.maxPrice = maxprice.value;
	return filtersProduct;
})
function searchName() {
  store.commit('searchHeader', filtersData.value);
}
</script>

<style scoped>
.filter_name{
    margin-bottom: 10px;
    font-size: 18px;
}
.main_name_filter{
    margin-bottom: 20px;
}
.inp_search{
    display: block;
    border-radius: 24px;
    outline: none;
    border: 1px solid #8000FF;
    height: 40px;
    width: 250px;
    padding: 0 10px;
    margin-bottom: 20px;
}
.range_price {
    display: flex;
    justify-content: space-between;
}
.inp_search.price {
    width: 120px;
}
.btn_filter {
	border-radius: 24px;
  outline: none;
  border: 1px solid #8000FF;
  height: 40px;
  width: 250px;
	background: none;
	font-size: 16px;
	transition: 0.4s;
	font-weight: 500;
	margin-bottom: 10px;
}
.btn_filter:hover {
	background: #8000FF;
	color: #fff;
	transition: 0.4s;
}
</style>