<template>
    <div>
        <div class="header">
            <div class="container container_header">
                <div class="header-wrap">
                    <router-link to="/"><img class="logo" src="/alexLogo.svg" alt="logo"></router-link>
                    <SearchProducts />
                    <div class="basket_logo">
                        <router-link to="/createProduct" class="create-product-btn">Добавить продукт</router-link >
                        <button class="basket_btn">
                            <div class="basket_counter"><p>0</p></div>
                            <img src="/basket.svg" alt="basket" class="icon_basket">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import SearchProducts from './SearchProducts.vue'

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
}
.basket_counter p {
    font-size: 12px;
    font-weight: 500;
    color: #8000FF;
}
.icon_basket{
    width: 36px;
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
</style>