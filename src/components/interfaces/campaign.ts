import type {IItem} from './items'

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

	inventory: {
		common: Array<IItem>
		uncommon: string
		parts: string
		equipment: string
	}
}
