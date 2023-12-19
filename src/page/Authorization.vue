<template>
  <div class="authorization_wrap">
    <div :class="{ 'right-panel-active': active }" class="container">
      <div class="form-container sign-up-container">
        <Form @submit="registrationSend">
          <h1>Регистрация</h1>
          <Field
						:rules="requiredValue"
						class="inp_order"
						type="text"
						name="userName"
						placeholder="Name"
						v-model="registrationName"
					/>
          <ErrorMessage class="filter_error" name="userName" />
          <Field
						:rules="validateEmail"
						class="inp_order"
						type="email"
						name="userEmail"
						placeholder="Email"
						v-model="registrationEmail"
					/>
          <ErrorMessage class="filter_error" name="userEmail" />
          <Field
						:rules="passwordValue"
						class="inp_order"
						type="password"
						name="userPassword"
						placeholder="Password"
						v-model="registrationPassword"
					/>
          <ErrorMessage class="filter_error" name="userPassword" />
          <button>Зарегистрироваться</button>
        </Form>
      </div>
      <div class="form-container sign-in-container">
        <Form @submit="entranceSend">
          <h1>Введите данные</h1>
          <span>вашего аккаунта</span>
          <Field
						:rules="validateEmail"
						class="inp_order"
						type="email"
						name="userEmail"
						placeholder="Email"
						v-model="entranceEmail"
					/>
					<ErrorMessage class="filter_error" name="userEmail" />
					<Field
						:rules="passwordValue"
						class="inp_order"
						type="password"
						name="userPassword"
						placeholder="Password"
						v-model="entrancePassword"
					/>
					<ErrorMessage class="filter_error" name="userPassword" />
          <!-- <a href="#">Forgot your password?</a> -->
          <button>Войти</button>
        </Form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Есть Аккаунт?</h1>
            <p>Нажмите для того чтобы войти</p>
            <button @click="active = !active" class="ghost" id="signIn">Войти</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Нет аккаунта?</h1>
            <p>Нажмите для того чтобы создать его</p>
            <button @click="active = !active" class="ghost">Создать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/init.js'

const store = useStore();
const router = useRouter()
const active = ref(false);
const registrationName = ref('');
const registrationEmail = ref('');
const registrationPassword = ref('');
const entranceEmail = ref('');
const entrancePassword = ref('');

function requiredValue(value) {
	if (!value) {
		return 'Это обязательное поле';
	}
	return true;
}
function passwordValue(value) {
	if (!value) {
		return 'Это обязательное поле';
	}
	if(value.length < 6) {
		return 'Пароль должен быть больше 6 символов';
	}
	return true;
}
function validateEmail(value) {
	if (!value) {
		return 'Email обязательное поле';
	}
	const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	if (!regex.test(value)) {
		return 'Некорректный email';
	}
	return true;
}

function entranceSend() {
	let entranceData = {
		email: entranceEmail.value,
		pass: entrancePassword.value
	}
	store.dispatch('setEntranceSendAction', entranceData).then(()=> {
		entranceEmail.value = '';
	  	entrancePassword.value = '';
		router.push({
        name: 'home'
      })

	})
}
function registrationSend() {
	let registrationData = {
		name: registrationName.value,
		email: registrationEmail.value,
		pass: registrationPassword.value
	}
	store.dispatch('setRegistrationSendAction', registrationData).then(()=> {
		registrationName.value = '';
		registrationEmail.value = '';
		registrationPassword.value = '';
		router.push({
        name: 'home'
      })

	})
}

</script>

<style scoped>
  .filter_error {
    color: red;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
  }
.authorization_wrap{
	margin: auto;
	position: absolute;
	top: 50%; left: 50%;
	-webkit-transform: translate(-50%,-50%);
	-ms-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
  	display: flex;
  	justify-content: center;
  	align-items: center;
}
h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #8000FF;
	background-color: #8000FF;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #8000FF;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
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
</style>