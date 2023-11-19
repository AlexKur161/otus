<template>
    <div class="card">
        <div class="img-wrap">
            <img class="img-card" :src="productCard.image" alt="">
        </div>
        <div class="description-wrap">
          <div>
            <p class="price-card">{{ productCard.price }} $</p>
            <p class="name-product">{{ productCard.title }}</p>
            <p class="description-product">{{ productCard.description }}</p>
          </div>
            <div class="category-rating">
              <div class="rating-wrap">
                <img class="icon-star" src="/star.svg" alt="rating">
                <p class="rating_number">{{productCard.rating.rate}}</p>
              </div>
              <div class="category-wrap">
                <p class="category-title">{{productCard.category}}</p>
              </div>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
  productCard: {
    type: Object,
    default: {
      category:'',
      description:'',
      image:'',
      price: 0,
      rating: {
        rate: ''
      },
      title:''
    }
  }
})
</script>

<style>
.card {
  padding: 20px;
  width: 300px;
  height: 400px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(36,36,36,.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: 1.1s;
  scale: 1;
}
.card:hover{
  transition: 1.1s;
  scale: 1.1;
}
.img-wrap{
  width: 100%;
  height: 200px;
}
.img-card {
  width: 100%;
  height: 100%;
}
.description-wrap{
  flex-grow: 1;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price-card{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}
.name-product {
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description-product{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.category-rating{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating-wrap{
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon-star {
  width: 14px;
}

</style>