<template>
  <div>
    <p class="filter_name main_name_filter">Отфильтровать продукты:</p>
    <p class="filter_name">По имени</p>
    <Form @submit="searchName">
    <Field
      v-model="search"
      class="inp_search"
      name="text"
      type="text"
    />
    <p class="filter_name">По цене</p>
    <div class="range_price">
        <Field v-model.number="minPrice" class="inp_search price" name="minPrice" type="number" :rules="validateMinPrice"/>
        <Field v-model.number="maxPrice" class="inp_search price" name="maxPrice" type="number" :rules="validateMaxPrice"/>
    </div>
    <div class="filter_error price_error_one"><ErrorMessage name="minPrice" /></div>
    <div class="filter_error price_error"><ErrorMessage name="maxPrice" /></div>
    <button class="btn_filter">Отфильтровать</button>
  </Form>
		<button @click="clearFilters" class="btn_filter">Сбросить фильтры</button>
  </div>
</template>

<script setup>
import { ref, watch, computed, onUpdated } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useStore } from 'vuex';

const search = ref('');
const minPrice = ref(0);
const maxPrice = ref(0);
const store = useStore();

const filtersData = computed(() => {
	const filtersProduct = {};
	filtersProduct.minPrice = minPrice.value;
	filtersProduct.maxPrice = maxPrice.value;
	return filtersProduct;
})

const nameFilter = computed(() => store.getters.getNameFilter)

function searchName() {
  store.commit('setnameFilter', search.value);
  store.commit('searchHeader', filtersData.value);
}

function clearFilters() {
  search.value = '';
  minPrice.value = 0;
  maxPrice.value = 0;
  store.commit('setnameFilter', search.value);
  store.commit('searchHeader', filtersData.value);
}

function validateMinPrice (value) {
  if(typeof value !== 'number') {
    return 'Минимальное значение должно быть числом'
  }
  if(value < 0) {
    return 'Минимальное значение не может быть отрицательным'
  }
  if(minPrice.value > maxPrice.value) {
    return 'Минимальное значение не может быть больше максимального'
  }
  return true
}

function validateMaxPrice (value) {
  if(typeof value !== 'number') { console.log(typeof value)
    return 'Максимальное значение должно быть числом'
  }
  if(value < 0) {
    return 'Максимальное значение не может быть отрицательным'
  }
  return true
}
watch(nameFilter, () => {
console.log('onUpdate сработал');
search.value = nameFilter.value;
})
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
.filter_error {
  color: red;
  font-size: 14px;
}
.price_error {
  margin-bottom: 20px;
}
.price_error_one{
  margin-bottom: 10px;
}
.price::-webkit-outer-spin-button,
.price::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type=number]{
    -moz-appearance: textfield;
}
</style>