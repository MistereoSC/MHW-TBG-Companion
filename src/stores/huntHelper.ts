import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useHuntHelperStore = defineStore('huntHelper', () => {
	const MAX_POTIONS = 3
	const MAX_LIVES = 3
	const countPotions = ref(MAX_POTIONS)
	const countLives = ref(MAX_LIVES)
	function incrementPotions() {
		if (countPotions.value >= MAX_POTIONS) return MAX_POTIONS
		return countPotions.value++
	}
	function decrementPotions() {
		if (countPotions.value <= 0) return 0
		return countPotions.value--
	}
	function incrementLives() {
		if (countLives.value >= MAX_LIVES) return MAX_LIVES
		return countLives.value++
	}
	function decrementLives() {
		if (countLives.value <= 0) return 0
		return countLives.value--
	}

	return {
		countPotions,
		incrementPotions,
		decrementPotions,
		countLives,
		incrementLives,
		decrementLives,
	}
})
