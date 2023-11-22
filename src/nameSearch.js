import { ref, onUpdated, computed } from 'vue'
export function useSearch() {
    const search = ref('');
    onUpdated(() => {
        console.log(search.value)
        // search.value = name;
    })
    computed(() => {
        console.log('2', search.value)
        return search.value;
        
    })
    console.log('1',search);
    return {
        search
    }
}