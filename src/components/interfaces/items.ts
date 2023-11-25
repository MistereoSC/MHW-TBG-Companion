import ItemData from '@/assets/data/loot.json'

export interface IExpansions<T> {
	basic: T
	ancient_forest: T
	wildspire_waste: T
	kulu: T
	teostra: T
	nergigante: T
	kushala: T
}

// =================================================================
// Armor Sets
// =================================================================

export interface IArmorSet {
	name: string
	icon: string
	rarity: number
	helm: IArmor
	mail: IArmor
	greaves: IArmor
}
export interface IArmor {
	armor: number
	resistance: null | {
		type: string | 'fire' | 'water' | 'thunder' | 'ice' | 'dragon'
		amount: number
	}
	effect: null | {name: string; description: string}
	parts: Array<{name: string; amount: number}>
}

// =================================================================
// Weapon Sets
// =================================================================

export interface IWeaponSet {
	name: string
	icon: string
	weapons: Array<IWeapon>
}
export interface IWeapon {
	name: string
	rarity: number
	icon: string
	parts: Array<{name: string; amount: number}>
	damage: Array<{
		value: number
		amount: number
	}>
	remove: Array<{
		name: string
		amount: number
	}>
	add: Array<{
		name: string
		amount: number
	}>
	armor?: number
}

export enum EWeapons {
	Greatsword,
	SnS,
	Dualblades,
	Bow,

	Gunlance,
	Chargeblade,
	InsectGlaive,
	HeavyBowgun,

	Longsword,
	Hammer,
	Lance,
	Switchaxe,
	HuntingHorn,
	LightBowgun,
}
export const EWeaponsString = [
	'greatsword',
	'sns',
	'dualblades',
	'bow',
	'gunlance',
	'chargeblade',
	'glaive',
	'hbg',
	'longsword',
	'hammer',
	'lance',
	'switchaxe',
	'horn',
	'lbg',
]
// =================================================================
// Lootable Items
// =================================================================

export interface IItemCategories {
	common: IItem
	uncommon: IItem
	parts: IItem
}
export interface IItem {
	id: number
	name: string
	color: number
	icon: string
	amount: number
	origin?: string
	origin_icon?: string
}

export function getDefaultInventory() {
	const common = [] as Array<IItem>
	ItemData.common.forEach((item) => {
		common.push({amount: 0, ...item})
	})
	// const uncommon = [] as Array<IItem>
	// ItemData.uncommon.forEach((item) => {
	// 	common.push({amount: 0, ...item})
	// })
	// const parts = [] as Array<IItem>
	// ItemData.parts.forEach((item) => {
	// 	common.push({amount: 0, ...item})
	// })

	const inventory = {
		common: common,
		uncommon: '',
		parts: '',
		equipment: '',
	}
	return inventory
}
// =================================================================
// Weapons
// =================================================================
