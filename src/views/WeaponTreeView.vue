<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import WeaponMenu from '@/components/trees/WeaponMenu.vue'

enum EWeapons {
	SnS,
	Greatsword,
	Dualblades,
	Bow,
}
const selectedWeapon = ref(EWeapons.SnS)
function selectWeapon(value: EWeapons) {
	selectedWeapon.value = value
}
</script>

<template>
	<div class="page">
		<div class="page__top"></div>
		<div class="page__bottom">
			<WeaponMenu></WeaponMenu>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: 1fr auto;

	&__bottom {
		background-color: c.$background-00;
	}
}
</style>
