<template>
  <div>
    <Form @submit="send">
      <div class="wrap_order">
        <h3 class="title_order">Заполните поля для заказа</h3>
        <Field
          class="inp_order"
          name="nameUser"
          type="text"
          placeholder="Введите ваше имя"
        />
        <Field
          class="inp_order"
          name="patronymicUser"
          type="text"
          placeholder="Введите ваше отчество"
        />
        <Field
          class="inp_order"
          name="surnameUser"
          type="text"
          placeholder="Введите вашу фамилию"
        />
        <Field
          class="inp_order"
          name="emailUser"
          type="email"
          placeholder="Введите вашу email"
        />
        <Field
          class="inp_order policy_mr"
          name="mapUser"
          type="number"
          placeholder="Введите номер карты"
        />
        <Field v-slot="{ field }" name="policyUser" type="checkbox" :value="true">
        <label class="label_order">
          <input type="checkbox" name="terms" v-bind="field" :value="true" />
          Согласиться с обработкой данных
        </label>
      </Field>
        <div class="filter_error price_error_one"><ErrorMessage name="nameUser" /></div>
        <div class="filter_error price_error"><ErrorMessage name="email" /></div>
        <button class="btn_order">Заказать</button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useStore } from 'vuex';

const store = useStore();

function send(){
  store.dispatch('sendOrder', {
    name: 'fwfe',
    id: 1
  })
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
</style>
