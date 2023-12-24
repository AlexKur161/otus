<template>
  <div>
    <div class="header">
      <div class="container container_header">
				<div class="header-wrap">
					<router-link to="/"><img class="logo" src="/alexLogo.svg" alt="logo"></router-link>
					<SearchProducts />
					<div class="wrap_header_user">
						<div class="basket_logo">
							<router-link v-if="user.accesToken !== null" to="/createProduct" class="create-product-btn">Добавить продукт</router-link >
							<router-link to="/basket" class="basket_btn">
									<div class="basket_counter"><p>{{ quantity }}</p></div>
									<img src="/basket.svg" alt="basket" class="icon_basket">
                            </router-link>
						</div>
						<router-link v-if="user.accesToken === null" to="/authorization" class="login_wrap">
							<div class="basket_btn">
									<img src="/door.svg" alt="basket" class="icon_door">
							</div>
							<p class="create-product-btn">Войти</p >
						</router-link>
                        <div class="profile" v-else>
                            <p style="color: #fff;">{{ user?.userName }}</p>
                            <div class="exit_wrap"><button @click="exit">Выйти</button></div>
                        </div>
					</div>				
				</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchProducts from './SearchProducts.vue'
import { useStore } from 'vuex';

const store = useStore();

const quantity = computed(() => store.getters.getQuantityBasket)
const user = computed(()=> store.getters.getUser);


function exit() {
    store.commit('setEntranceSend', {
        userName: null,
        accesToken: null,
        refreshToken: null
    })
    localStorage.removeItem('user');
}

onMounted(()=> {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        store.commit('setEntranceSend', user);
    }
})
</script>
<style scoped>
.header {
    height: 80px;
    background:  #8000FF;
}
.container_header{
    height: 100%;
}
.header-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.logo{
    width: 150px;
}
.basket_btn{
    background: none;
    position: relative;
    border: none;
}
.basket_counter{
    border-radius: 90px;
    background: #fff;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.basket_counter p {
    font-size: 12px;
    font-weight: 500;
    color: #8000FF;
}
.icon_basket{
    width: 36px;
}
.icon_door{
	width: 36px;
	margin-top: 3px;
}
.basket_logo {
    display: flex;
    gap: 20px;
    align-items: center;
}
.create-product-btn{
    color: #fff;
    background: none;
    border: none;
}
.wrap_header_user{
	display: flex;
	align-items: center;
	gap: 40px;
}
.login_wrap{
	display: flex;
	align-items: center;
}
.profile {
    position: relative;
}
.exit_wrap {
    position: absolute;
    border-radius: 9px;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(36,36,36,.1);
    width: 100%;
    min-width: 70px;
    height: 50px;
    display: none;
    justify-content: center;
}
.exit_wrap button {
    background: none;
    border: none;
    font-size: 16px;
}
.profile:hover .exit_wrap{
    display: flex;
}
.exit_wrap:hover{
    display: flex;
}
</style>