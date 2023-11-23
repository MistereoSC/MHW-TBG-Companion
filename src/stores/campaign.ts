import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {ICampaignData, ICharacterData} from '@/components/interfaces/campaign'
import {getDefaultInventory} from '@/components/interfaces/items'
import {getRandomMonsterIcon, getRandomWeaponIcon} from '@/components/icons/icon_helper'

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
			'0': null as null | ICampaignData,
			'1': null as null | ICampaignData,
			'2': null as null | ICampaignData,
		}
		const _slotA = localStorage.getItem('slotA')
		if (_slotA) {
			slots[0] = JSON.parse(_slotA)
		}

		const _slotB = localStorage.getItem('slotB')
		if (_slotB) {
			slots[1] = JSON.parse(_slotB)
		}

		const _slotC = localStorage.getItem('slotC')
		if (_slotC) {
			slots[2] = JSON.parse(_slotC)
		}
		return slots
	}
	// #endregion

	//#region Campaign and Character Creation and Deletion
	function createNewCampaign(slot: number, name: string, icon?: string) {
		if (slot < 0 || slot >= 3) return undefined
		const newCampaign = {
			creation_date: Date.now(),
			last_update: Date.now(),
			title: name,
			icon: getRandomMonsterIcon(false),
			potions: 0,
			characters: [],
			days: [],
		} as ICampaignData
		if (icon) newCampaign.icon = icon

		activeSlot.value = slot
		campaignData.value = newCampaign
		saveSlot()
		return newCampaign
	}

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
	// #endregion

	return {
		activeSlot,
		campaignData,
		loadSlot,
		saveSlot,
		getSlotPreviews,
		createNewCampaign,
		createNewCharacter,
		setCharacter,
	}
})
