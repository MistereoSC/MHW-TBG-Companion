<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import WeaponMenu from '@/components/trees/WeaponMenu.vue'
import WeaponPage from '@/components/trees/WeaponPage.vue'
import {EWeapons} from '@/components/interfaces/items'

import {useSettingsStore} from '@/stores/settings'
const settingsStore = useSettingsStore()

const selectedWeapon = ref(EWeapons.Greatsword)
function selectWeapon(value: EWeapons) {
	selectedWeapon.value = value
}

onMounted(() => {
	if (
		settingsStore.settingsData?.owned_expansions.ancient_forest === false &&
		settingsStore.settingsData?.owned_expansions.wildspire_waste === true
	) {
		selectWeapon(EWeapons.Gunlance)
	} else {
		selectWeapon(EWeapons.Greatsword)
	}
})
</script>

<template>
	<div class="page">
		<div class="page__top">
			<WeaponPage :active_weapon="selectedWeapon"></WeaponPage>
		</div>
		<div class="page__bottom">
			<WeaponMenu @select="(val) => selectWeapon(val)" :active_weapon="selectedWeapon"></WeaponMenu>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: auto auto;
	&__bottom {
		background-color: c.$background-00;
	}
}
</style>
