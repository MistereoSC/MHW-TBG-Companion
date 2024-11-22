import type {ICampaignData, ICampaignDay, ICharacterData} from '@/components/interfaces/campaign'
import {EWeaponIconsArr, EMonsterArr, getRandomMonsterIcon, getRandomWeaponIcon} from '@/components/icons/icon_helper'
import {getDefaultInventory} from '@/components/interfaces/items'
import {VERSION} from '@/stores/campaign'

export function validateSave(save: unknown) {
	const newSaveData = {} as ICampaignData
	if (save == null) return undefined
	if (typeof save !== 'object') return undefined

	// Mandatory Fields
	if (!('characters' in save) || typeof save.characters !== 'object' || !Array.isArray(save.characters)) return undefined
	const validatedCharacters = validateCharacters(save.characters)
	if (validatedCharacters == undefined) return undefined
	newSaveData.characters = validatedCharacters

	if (!('days' in save) || typeof save.days !== 'object' || !Array.isArray(save.days)) return undefined
	const validatedDays = validateDays(save.days)
	if (validatedDays == undefined) return undefined
	newSaveData.days = validatedDays

	if (!('title' in save) || typeof save.title !== 'string') return undefined
	newSaveData.title = save.title

	if (!('potions' in save) || typeof save.potions !== 'number') return undefined
	newSaveData.potions = save.potions

	if (!('max_days' in save) || typeof save.max_days !== 'number') return undefined
	newSaveData.max_days = save.max_days

	// "Optional" Fields are filled is missing
	if ('icon' in save && typeof save.icon == 'string') {
		if (iconIsValid(save.icon, 'monster')) newSaveData.icon = save.icon
		else newSaveData.icon = getRandomMonsterIcon(false)
	} else {
		newSaveData.icon = getRandomMonsterIcon(false)
	}

	if ('last_update' in save && typeof save.last_update == 'number') {
		newSaveData.last_update = save.last_update
	} else {
		newSaveData.last_update = Date.now()
	}

	if ('creation_date' in save && typeof save.creation_date == 'number') {
		newSaveData.creation_date = save.creation_date
	} else {
		newSaveData.creation_date = Date.now()
	}

	if ('version' in save && typeof save.version == 'number') {
		newSaveData.version = save.version
		if (save.version !== VERSION) {
			//TODO: migrate Version if necessary | update Version Number
			console.warn(`Version Mismatch::: Application is at Version ${VERSION} but Savefile is at Version ${save.version}`)
		}
	} else {
		newSaveData.version = VERSION
	}

	return newSaveData
}

export function validateDays(days: Array<unknown>) {
	const validatedDays = [] as Array<ICampaignDay>
	for (let i = 0; i < days.length; i++) {
		const el = days[i]
		if (el == null || typeof el !== 'object') return undefined
		const newDay = {} as ICampaignDay
		if (!('day' in el) || typeof el.day !== 'number') return undefined
		newDay.day = el.day
		if (!('type' in el) || typeof el.type !== 'string' || !['hunt', 'downtime'].includes(el.type)) newDay.type = 'downtime'
		//@ts-ignore
		else newDay.type = el.type

		if ('icon' in el && typeof el.icon == 'string' && iconIsValid(el.icon, 'day')) {
			newDay.icon = el.icon
		} else {
			if (newDay.type == 'hunt') newDay.icon = 'monsters/jagras'
			else newDay.icon = 'misc/quest_cat'
		}
		validatedDays.push(newDay)
	}
	return validatedDays
}

export function validateCharacters(characters: Array<unknown>) {
	const validatedCharacters = [] as Array<ICharacterData>
	for (let i = 0; i < characters.length; i++) {
		const char = characters[i]
		const newChar = {} as ICharacterData
		if (char == null || typeof char !== 'object') continue

		if (!('inventory' in char) || typeof char.inventory != 'object') continue
		const validatedInventory = validateInventory(char.inventory)
		if (!validatedInventory) continue
		newChar.inventory = validatedInventory

		if ('icon' in char && typeof char.icon == 'string') {
			if (iconIsValid(char.icon, 'weapon')) newChar.icon = char.icon
			else newChar.icon = getRandomWeaponIcon(false)
		} else {
			newChar.icon = getRandomWeaponIcon(false)
		}

		if (!('palico_name' in char) || typeof char.palico_name != 'string') newChar.palico_name = 'Palico'
		else newChar.palico_name = char.palico_name

		if (!('hunter_name' in char) || typeof char.hunter_name != 'string') newChar.hunter_name = 'Hunter'
		else newChar.hunter_name = char.hunter_name

		if ('last_update' in char && typeof char.last_update == 'number') newChar.last_update = char.last_update
		else newChar.last_update = Date.now()

		if ('creation_date' in char && typeof char.creation_date == 'number') newChar.creation_date = char.creation_date
		else newChar.creation_date = Date.now()

		validatedCharacters.push(newChar)
	}
	return validatedCharacters
}

export function validateInventory(inventory: unknown) {
	if (inventory == null || typeof inventory !== 'object') return undefined
	const newInventory = getDefaultInventory()

	if (!('common' in inventory) || typeof inventory.common !== 'object' || !Array.isArray(inventory.common)) return undefined

	for (let i = 0; i < inventory.common.length; i++) {
		const item = inventory.common[i]
		if (item == null || typeof item !== 'object') continue
		if (!('id' in item) || typeof item.id !== 'number') continue
		if (!('amount' in item) || typeof item.amount !== 'number') continue
		if (!('color' in item) || typeof item.color !== 'number') continue
		if (!('icon' in item) || typeof item.icon !== 'string') continue
		if (!('name' in item) || typeof item.name !== 'string') continue
		newInventory.common[i] = item
	}

	if ('equipment' in inventory && typeof inventory.equipment == 'string') newInventory.equipment = inventory.equipment
	if ('uncommon' in inventory && typeof inventory.uncommon == 'string') newInventory.uncommon = inventory.uncommon
	if ('parts' in inventory && typeof inventory.parts == 'string') newInventory.parts = inventory.parts

	return newInventory
}

export function iconIsValid(icon: string, iconType: 'monster' | 'day' | 'weapon') {
	if (iconType == 'monster') {
		if (!icon.startsWith('monsters/')) return false
		const monster = icon.substring(9)
		return EMonsterArr.includes(monster)
	} else if (iconType == 'weapon') {
		if (!icon.startsWith('weapons/')) return false

		const rarity = icon.slice(-2)
		if (!['_0', '_1', '_2', '_3', '_4'].includes(rarity)) return false

		const weapon = icon.slice(8, -2)
		if (!EWeaponIconsArr.includes(weapon)) return false

		return true
	} else if (iconType == 'day') {
		const validNonMonsterIcons = [
			'items/ore_2',
			'items/bone_1',
			'misc/food',
			'misc/quest_cat',
			'icon_quest',
		]
		if (validNonMonsterIcons.includes(icon)) return true
		const monster = icon.substring(9)
		return EMonsterArr.includes(monster)
	}
}