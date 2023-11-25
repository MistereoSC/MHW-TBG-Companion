import {defineStore} from 'pinia'
import {ref} from 'vue'
import {type ISettings, getDefaultSettings, EExpansions} from '@/components/interfaces/settings'

export const useSettingsStore = defineStore('settings', () => {
	const settingsData = ref(null as null | ISettings)

	// #region LocalStorage Management
	function loadSettings() {
		let settingsStore = localStorage.getItem('settings')
		if (settingsStore) {
			settingsData.value = JSON.parse(settingsStore)
			return settingsData.value
		} else {
			const defaultSettings = getDefaultSettings()
			settingsData.value = defaultSettings
			saveSettings()
			return defaultSettings
		}
	}
	function saveSettings() {
		if (settingsData.value === null) return
		localStorage.setItem('settings', JSON.stringify(settingsData.value))
	}

	function toggleExpansion(expansion: EExpansions, value?: boolean) {
		if (!settingsData.value) return

		if (expansion == EExpansions.ancient_forest) {
			if (value === undefined) {
				if (
					settingsData.value.owned_expansions.ancient_forest === true &&
					settingsData.value.owned_expansions.wildspire_waste === false
				)
					return
			} else if (value === false) {
				if (settingsData.value.owned_expansions.wildspire_waste === false) return
			}
		}
		if (expansion == EExpansions.wildspire_waste) {
			if (value === undefined) {
				if (
					settingsData.value.owned_expansions.ancient_forest === false &&
					settingsData.value.owned_expansions.wildspire_waste === true
				)
					return
			} else if (value === false) {
				if (settingsData.value.owned_expansions.ancient_forest === false) return
			}
		}

		switch (expansion) {
			case EExpansions.ancient_forest:
				settingsData.value.owned_expansions.ancient_forest =
					value !== undefined ? value : !settingsData.value.owned_expansions.ancient_forest
				break
			case EExpansions.wildspire_waste:
				settingsData.value.owned_expansions.wildspire_waste =
					value !== undefined ? value : !settingsData.value.owned_expansions.wildspire_waste
				break
			case EExpansions.kulu:
				settingsData.value.owned_expansions.kulu =
					value !== undefined ? value : !settingsData.value.owned_expansions.kulu
				break
			case EExpansions.teostra:
				settingsData.value.owned_expansions.teostra =
					value !== undefined ? value : !settingsData.value.owned_expansions.teostra
				break
			case EExpansions.nergigante:
				settingsData.value.owned_expansions.nergigante =
					value !== undefined ? value : !settingsData.value.owned_expansions.nergigante
				break
			case EExpansions.kushala:
				settingsData.value.owned_expansions.kushala =
					value !== undefined ? value : !settingsData.value.owned_expansions.kushala
				break
			case EExpansions.hunters_arsenal:
				settingsData.value.owned_expansions.hunters_arsenal =
					value !== undefined ? value : !settingsData.value.owned_expansions.hunters_arsenal
				break
			default:
				break
		}
		saveSettings()
	}

	function ownsNonBaseExpansion() {
		if (!settingsData.value) return false
		return (
			settingsData.value.owned_expansions.kulu ||
			settingsData.value.owned_expansions.teostra ||
			settingsData.value.owned_expansions.nergigante ||
			settingsData.value.owned_expansions.kushala
		)
	}

	const general = {
		toggleWeaponDirection: (value?: boolean) => {
			if (!settingsData.value) return
			settingsData.value.general.weapon_direction_vertical =
				value !== undefined ? value : !settingsData.value.general.weapon_direction_vertical
			saveSettings()
		},
		toggleArmorDirection: (value?: boolean) => {
			if (!settingsData.value) return
			settingsData.value.general.armor_direction_vertical =
				value !== undefined ? value : !settingsData.value.general.armor_direction_vertical
			saveSettings()
		},
	}

	return {
		settingsData,
		loadSettings,
		saveSettings,
		toggleExpansion,
		ownsNonBaseExpansion,
		general,
	}
})
