export interface IExpansions<T> {
	basic: T
	wildspire_waste: T
	ancient_forest: T
	kulu: T
	teostra: T
	nergigante: T
	kushala: T
}

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
	effect: null | string
	parts: Array<{name: string; amount: number}>
}
