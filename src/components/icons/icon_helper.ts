export function getRandomMonsterIcon(full_path: boolean) {
	const icon = Math.floor(Math.random() * 14)
	return `${full_path ? '/icons/' : ''}monsters/${EMonsterIcons[icon]}${full_path ? '.png' : ''}`
}
export function getRandomWeaponIcon(full_path: boolean, rarity?: number) {
	const icon = Math.floor(Math.random() * 14)
	const num = rarity !== undefined ? rarity : Math.floor(Math.random() * 5)
	return `${full_path ? '/icons/' : ''}weapons/${EWeaponIcons[icon]}_${num}${
		full_path ? '.png' : ''
	}`
}

export enum EMonsterIcons {
	'jagras',
	'tobi',
	'anjanath',
	'rathalos',
	'rathalos_azure',
	'pukei',
	'barroth',
	'jyuratodus',
	'diablos',
	'diablos_black',
	'kulu',
	'teostra',
	'nergigante',
	'kushala',
}

export const EMonsterArr = [
	'jagras',
	'tobi',
	'anjanath',
	'rathalos',
	'rathalos_azure',
	'pukei',
	'barroth',
	'jyuratodus',
	'diablos',
	'diablos_black',
	'kulu',
	'teostra',
	'nergigante',
	'kushala',
]

export enum EWeaponIcons {
	'longsword',
	'greatsword',
	'sns',
	'dualblades',
	'hammer',
	'horn',
	'lance',
	'gunlance',
	'switchaxe',
	'glaive',
	'chargeblade',
	'bow',
	'lbg',
	'hbg',
}

export const EWeaponIconsArr = [
	'longsword',
	'greatsword',
	'sns',
	'dualblades',
	'hammer',
	'horn',
	'lance',
	'gunlance',
	'switchaxe',
	'glaive',
	'chargeblade',
	'bow',
	'lbg',
	'hbg',
]

export enum EColors {
	White,
	Yellow,
	Green,
	Purple,
	Red,
}
export enum EColorsHex {
	White = '#FFFFFF',
	Yellow = '#f8d058',
	Green = '#70c888',
	Purple = '#a858c0',
	Red = '#f85858',
}
