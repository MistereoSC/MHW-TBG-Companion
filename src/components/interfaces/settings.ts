export interface ISettings {
	owned_expansions: {
		ancient_forest: boolean
		wildspire_waste: boolean
		kulu: boolean
		teostra: boolean
		nergigante: boolean
		kushala: boolean
		hunters_arsenal: boolean
	}
	general: {
		armor_direction_vertical: boolean
		weapon_direction_vertical: boolean
	}
}
export enum EExpansions {
	ancient_forest,
	wildspire_waste,
	kulu,
	teostra,
	nergigante,
	kushala,
	hunters_arsenal,
}

export function getDefaultSettings(): ISettings {
	const newSettings = {
		owned_expansions: {
			ancient_forest: true,
			wildspire_waste: true,
			kulu: true,
			teostra: true,
			nergigante: true,
			kushala: true,
			hunters_arsenal: true,
		},
		general: {
			armor_direction_vertical: false,
			weapon_direction_vertical: true,
		},
	}
	return newSettings
}
