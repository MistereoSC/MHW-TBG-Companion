export interface ICampaignData {
	creation_date: number
	last_update: number

	title: string
	icon: string

	potions: number
	characters: Array<ICharacterData>
	days: []
}

export interface ICharacterData {
	creation_date: number
	last_update: number

	hunter_name: string
	palico_name: string
	icon: string

	inventory_parts: []
	inventory_common: []
	inventory_uncommon: []
	inventory_gear: []
}
