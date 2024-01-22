// import { ref, reactive, onUpdated, computed } from 'vue'
// import { useStore } from 'vuex'

// export function useSearch(title = '') {
//     const search = ref(title);
//     const store = useStore();
//     const getProductList = computed(() => store.getters.getProductList);
//     const next2 = computed(() => search.value )
//     const next = computed(() => {
//         let productListSearch
//         getProductList.value.array.forEach(item => {
//             const itemSearch = item.title.includes(search.value);
//             console.log(itemSearch)
//             if(itemSearch){
//                 productListSearch.push(item);
//             }
//         });
//     return productListSearch;
//     })
//     console.log('1', next);
//     console.log('1', search.value);
//     return {search, next}
// }