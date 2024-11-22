import type {IItem} from './items'

export interface ICampaignData {
	creation_date: number
	last_update: number

	title: string
	icon: string

	potions: number
	characters: Array<ICharacterData>
	max_days: number
	days: Array<ICampaignDay>
	version: number
}

export interface ICharacterData {
	creation_date: number
	last_update: number

	hunter_name: string
	palico_name: string
	icon: string

	inventory: IInventory
}

export interface ICampaignDay {
	day: number
	type: 'hunt' | 'downtime'
	icon: string
}

export interface IInventory {
	common: Array<IItem>
	uncommon: string
	parts: string
	equipment: string
}
