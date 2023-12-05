<template>
  <div>
    <Form @submit="send">
      <div class="wrap_order">
        <h3 class="title_order">Заполните поля для заказа</h3>
        <Field
          class="inp_order"
          name="nameUser"
          type="text"
          v-model="nameValue"
          :rules="validateNameUser"
          placeholder="Введите ваше имя"
        />
        <ErrorMessage class="filter_error" name="nameUser" />
        <Field
          class="inp_order"
          name="patronymicUser"
          type="text"
          v-model="patronymicValue"
          :rules="validateNameUser"
          placeholder="Введите ваше отчество"
        />
        <ErrorMessage class="filter_error" name="patronymicUser" />
        <Field
          class="inp_order"
          name="surnameUser"
          type="text"
          v-model="surnameValue"
          :rules="validateNameUser"
          placeholder="Введите вашу фамилию"
        />
        <ErrorMessage class="filter_error" name="surnameUser" />
        <Field
          class="inp_order"
          name="emailUser"
          type="email"
          v-model="emailValue"
          :rules="validateEmail"
          placeholder="Введите вашу email"
        />
        <ErrorMessage class="filter_error" name="emailUser" />
        <Field
          class="inp_order policy_mr"
          name="mapUser"
          v-model="mapUserInp"
          type="number"
          :rules="validateMapUser"
          placeholder="Введите номер карты"
        />
        <ErrorMessage class="filter_error map_error" name="mapUser" />
        <Field
          :rules="validatePolicyUser"
          v-slot="{ field }"
          name="policyUser"
          type="checkbox"
          :value="true"
        >
        <label class="label_order">
          <input type="checkbox" name="terms" v-bind="field" :value="true" />
          Согласиться с обработкой данных
        </label>
      </Field>
        <div class="filter_error policy-error"><ErrorMessage name="policyUser" /></div>
        <button class="btn_order">Заказать</button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useStore } from 'vuex';

const store = useStore();
const nameValue = ref('')
const patronymicValue = ref('')
const surnameValue = ref('')
const emailValue = ref('')
const mapUserInp = ref('');

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
    return 'Номер карты является числом';
  }
  return true;
}
function validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'Email обязательное поле';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'Некорректный email';
      }
      // All is good
      return true;
    }
function validatePolicyUser(value) {
  if(!value) {
    return 'Требуется ваше согласие на обработку данных'
  }
  return true
}
function send(){
  let dataUser = {};
  dataUser.nameValue = nameValue.value
dataUser.patronymicValue = patronymicValue.value;
dataUser.surnameValue = surnameValue.value;
dataUser.emailValue = emailValue.value;
dataUser.mapUserInp = mapUserInp.value;
console.log(dataUser);
  store.dispatch('sendOrder', dataUser);
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
</style>
