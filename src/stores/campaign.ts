import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {ICampaignData, ICampaignDay, ICharacterData} from '@/components/interfaces/campaign'
import {getDefaultInventory} from '@/components/interfaces/items'
import {getRandomMonsterIcon, getRandomWeaponIcon} from '@/components/icons/icon_helper'
export const VERSION = 4

export const useCampaignStore = defineStore('campaign', () => {
	const activeSlot = ref(null as null | number)
	const campaignData = ref(null as null | ICampaignData)

	// #region LocalStorage Management
	function loadSlot(slot: number | null) {
		if (slot === null) {
			activeSlot.value = null
			campaignData.value = null
			return null
		}
		if (slot < 0 || slot >= 3) return null
		let slotDataStore = null as null | string
		switch (slot) {
			case 0:
				slotDataStore = localStorage.getItem('slotA')
				break
			case 1:
				slotDataStore = localStorage.getItem('slotB')
				break
			case 2:
				slotDataStore = localStorage.getItem('slotC')
				break
		}
		if (slotDataStore) {
			campaignData.value = JSON.parse(slotDataStore)
			activeSlot.value = slot
			return campaignData.value
		} else {
			return null
		}
	}
	function saveSlot() {
		if (campaignData.value === null) return
		campaignData.value.last_update = Date.now()

		switch (activeSlot.value) {
			case 0:
				localStorage.setItem('slotA', JSON.stringify(campaignData.value))
				break
			case 1:
				localStorage.setItem('slotB', JSON.stringify(campaignData.value))
				break
			case 2:
				localStorage.setItem('slotC', JSON.stringify(campaignData.value))
				break
		}
	}
	function getSlotPreviews() {
		const slots = {
			slot_1: null as null | ICampaignData,
			slot_2: null as null | ICampaignData,
			slot_3: null as null | ICampaignData,
		}
		const _slotA = localStorage.getItem('slotA')
		if (_slotA) {
			slots.slot_1 = JSON.parse(_slotA)
		}

		const _slotB = localStorage.getItem('slotB')
		if (_slotB) {
			slots.slot_2 = JSON.parse(_slotB)
		}

		const _slotC = localStorage.getItem('slotC')
		if (_slotC) {
			slots.slot_3 = JSON.parse(_slotC)
		}
		return slots
	}
	// #endregion

	//#region Campaign Creation and Deletion
	function createNewCampaign(slot: number, name: string, icon?: string) {
		if (slot < 0 || slot >= 3) return undefined
		const newCampaign = {
			creation_date: Date.now(),
			last_update: Date.now(),
			title: name,
			icon: getRandomMonsterIcon(false),
			potions: 0,
			characters: [],
			max_days: 60,
			days: [],
			version: VERSION,
		} as ICampaignData
		if (icon) newCampaign.icon = icon

		activeSlot.value = slot
		campaignData.value = newCampaign
		saveSlot()
		return newCampaign
	}

	function deleteSlot(slot: number) {
		if (slot < 0 || slot >= 3) return
		if (activeSlot.value == slot) {
			activeSlot.value = null
			campaignData.value = null
		}

		let slotTemp = null as null | string
		switch (slot) {
			case 0:
				slotTemp = 'slotA'
				break
			case 1:
				slotTemp = 'slotB'
				break
			case 2:
				slotTemp = 'slotC'
				break
		}
		if (slotTemp !== null) {
			const slotData = localStorage.getItem(slotTemp)
			if (slotData) {
				localStorage.removeItem(slotTemp)
			}
		}
	}
	// #endregion

	//#region Character Management
	function createNewCharacter(hunter_name: string, palico_name: string, icon?: string) {
		if (!campaignData.value) return undefined
		const newCharacter = {
			creation_date: Date.now(),
			last_update: Date.now(),
			hunter_name: hunter_name,
			palico_name: palico_name,
			icon: getRandomWeaponIcon(false),
			inventory: getDefaultInventory(),
		} as ICharacterData
		if (icon) newCharacter.icon = icon

		campaignData.value.characters.push(newCharacter)
		saveSlot()
		return newCharacter
	}

	function setCharacter(slot: number, character: ICharacterData) {
		if (!campaignData.value) return
		// TODO: Validation
		campaignData.value.characters[slot] = character
		saveSlot()
	}

	function deleteCharacter(index: number) {
		if (!campaignData.value) return false
		campaignData.value.characters.splice(index, 1)
		saveSlot()
		return true
	}

	//#endregion

	//#region Miscellaneous
	function registerCampaignDay(day: ICampaignDay) {
		if (!campaignData.value) return false
		if (day.day - 1 !== campaignData.value.days.length) return false

		campaignData.value.days.push(day)
		saveSlot()
		return true
	}

	function setPotions(val: number) {
		if (!campaignData.value) return
		if (val < 0 || val > 99) return
		console.log('Updating Potions to ' + val)

		campaignData.value.potions = val
		saveSlot()
	}
	function getPotions() {
		if (!campaignData.value) return 0
		return campaignData.value.potions
	}
	//#endregion

	return {
		activeSlot,
		campaignData,
		loadSlot,
		saveSlot,
		getSlotPreviews,
		createNewCampaign,
		createNewCharacter,
		setCharacter,
		deleteSlot,
		deleteCharacter,
		registerCampaignDay,
		setPotions,
		getPotions,
	}
})
