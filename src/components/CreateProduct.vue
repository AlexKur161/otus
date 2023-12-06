<template>
    <div>
      <button class="btn_prev" @click="goPrev">
        <img class="prev-arrow" src="/left-arrow.svg" alt="arrow">
        <p>вернуться в каталог</p>
      </button>
      <Form @submit="create">
        <div class="wrap_order">
          <h3 class="title_order">Заполните поля нового продукта</h3>
          <Field
            class="inp_order"
            name="nameUser"
            type="text"
            v-model="nameProduct"
            :rules="validateNameUser"
            placeholder="Название продукта"
          />
          <ErrorMessage class="filter_error" name="nameUser" />
          <Field
            class="inp_order"
            name="patronymicUser"
            type="text"
            v-model="descriptionProduct"
            :rules="validateNameUser"
            placeholder="Описание продукта"
          />
          <ErrorMessage class="filter_error" name="patronymicUser" />
          <Field
            class="inp_order"
            name="surnameUser"
            type="text"
            v-model="categoryProduct"
            :rules="validateNameUser"
            placeholder="Категория продукта"
          />
          <ErrorMessage class="filter_error" name="surnameUser" />
          <Field
            class="inp_order policy_mr"
            name="mapUser"
            v-model="priceProduct"
            type="number"
            :rules="validateMapUser"
            placeholder="Цена"
          />
          <ErrorMessage class="filter_error map_error" name="mapUser" />
          <button class="btn_order">Добавить</button>
        </div>
      </Form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue'
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { useStore } from 'vuex';
  import { defineEmits } from 'vue';

  const emit = defineEmits(['linkPrev']);
  const store = useStore();
  const nameProduct = ref('');
  const descriptionProduct = ref('');
  const categoryProduct = ref('');
  const priceProduct = ref('');
  
  function validateNameUser(value) {
    if (!value) {
      return 'Это обязательное поле';
    }
    return true;
  }
  function validateMapUser(value) {
    if (!value) {
      return 'Это обязательное поле';
    }
    if (typeof value !== 'number') {
      return 'Цена является числом';
    }
    return true;
  }
  function create(){
    let dataUser = {};
    dataUser.nameProduct = nameProduct.value
    dataUser.descriptionProduct = descriptionProduct.value;
    dataUser.categoryProduct = categoryProduct.value;
    dataUser.priceProduct = priceProduct.value;
    console.log(dataUser);
    store.dispatch('setProductCreateAction', dataUser);
  }
  const goPrev = function() {
    emit('linkPrev');
  }

  </script>
  
  <style scoped>
  .wrap_order {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
  }
  .title_order{
    text-align: center;
    margin-bottom: 20px;
  }
  .inp_order {
    display: block;
    border-radius: 24px;
    outline: none;
    border: 1px solid #8000FF;
    height: 40px;
    width: 250px;
    padding: 0 10px;
    margin-bottom: 20px;
  }
  .btn_order {
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
    margin-top: 30px;
  }
  .btn_order:hover {
      background: #8000FF;
      color: #fff;
      transition: 0.4s;
  }
  .policy_order{
    width: 20px;
    height: 20px;
  }
  .label_order{
    font-size: 14px;
  }
  .policy_mr {
    margin-bottom: 10px;
  }
  .filter_error {
    color: red;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
  }
  .inp_order::-webkit-outer-spin-button,
  .inp_order::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
  .map_error{
    margin-top: 0;
  }
  .policy-error{
    margin-top: 10px;
    max-width: 200px;
    text-align: center;
  }
  .prev-arrow{
    height: 30px;
  }
  .btn_prev{
    display: flex;
    gap: 10px;
    align-items: center;
    background: none;
    border: none;
  }
  .btn_prev p {
    font-size: 18px;
    line-height: 100%;
    margin-bottom: 5px;
  }
  </style>