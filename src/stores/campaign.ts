import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const useCounterStore = defineStore('campaign', () => {
	const activeSlot = ref(0)

	const count = ref(0)
	const doubleCount = computed(() => count.value * 2)
	function increment() {
		count.value++
	}

	return {count, doubleCount, increment}
})
