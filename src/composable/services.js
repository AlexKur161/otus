import { ref } from 'vue'
export function useListProducts() {
   const fetchProducts = ref('')
   fetch('https://fakestoreapi.com/products')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    fetchProducts.value = data
  });
  return {
    fetchProducts
  }
}