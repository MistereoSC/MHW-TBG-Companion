<script lang="ts" setup>
import BorderComponent from '../BorderComponent.vue'
import WeaponItem from './WeaponItem.vue'
import {type IWeaponSet, EWeapons, EWeaponsString} from '@/components/interfaces/items'

const props = defineProps<{
	set: IWeaponSet
	weapon_class: EWeapons
	direction?: 'horizontal' | 'vertical'
}>()
console.log('SET: ', props.set)
</script>

<template>
	<div class="container" :class="{'direction-horizontal': props.direction == 'horizontal'}">
		<BorderComponent class="header__border" :blur_radius="10">
			<img :src="`/icons/${set.icon}.png`" class="header__icon" />
		</BorderComponent>
		<div class="line"></div>
		<WeaponItem :weapon_class="weapon_class" :item="set.weapons[0]" />
		<div class="line"></div>
		<WeaponItem :weapon_class="weapon_class" :item="set.weapons[1]" />
		<div class="line"></div>
		<WeaponItem :weapon_class="weapon_class" :item="set.weapons[2]" />
	</div>
</template>

<style lang="scss" scoped>
.header {
	&__border {
		width: 64px;
		height: 64px;
	}
	&__icon {
		width: 60px;
		height: 60px;
		background-color: c.$background;
		padding: 6px;
	}
}

.container:not(.container.direction-horizontal) {
	display: flex;
	flex-direction: column;
	align-items: center;
	.line {
		width: 4px;
		background-color: c.$background-3;
		height: 64px;
		margin: -20px 0;
		z-index: -1;
	}
}

.container.direction-horizontal {
	display: flex;
	align-items: center;
	.line {
		width: 128px;
		background-color: c.$background-3;
		height: 4px;
		margin: 0 -20px;
		z-index: -1;
	}
}
</style>
