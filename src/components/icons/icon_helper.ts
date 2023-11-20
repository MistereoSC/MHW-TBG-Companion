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

enum EMonsterIcons {
	'anjanath',
	'barroth',
	'diablos',
	'diablos_black',
	'jagras',
	'jyuratodus',
	'kulu',
	'kushala',
	'nergigante',
	'pukei',
	'rathalus',
	'rathalus_azure',
	'teostra',
	'tobi',
}
enum EWeaponIcons {
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
