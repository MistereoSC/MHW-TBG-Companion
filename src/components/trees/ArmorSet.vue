<script lang="ts" setup>
import type {IArmorSet} from '@/components/interfaces/items'
import ArmorItem from './ArmorItem.vue'
import BorderComponent from '../BorderComponent.vue'

const props = defineProps<{
	set: IArmorSet
}>()
</script>

<template>
	<div class="container">
		<BorderComponent class="header__border" :disable_hover="true">
			<img :src="`/icons/monsters/${set.icon}.png`" class="header__icon" />
		</BorderComponent>
		<div class="line"></div>
		<ArmorItem
			class="armor-item"
			:rarity="set.rarity"
			:name="set.name + ' Helm'"
			type="helm"
			:item="set.helm"
		></ArmorItem>
		<div class="line"></div>
		<ArmorItem
			class="armor-item"
			:rarity="set.rarity"
			:name="set.name + ' Mail'"
			type="mail"
			:item="set.mail"
		></ArmorItem>
		<div class="line"></div>
		<ArmorItem
			class="armor-item"
			:rarity="set.rarity"
			:name="set.name + ' Greaves'"
			type="greaves"
			:item="set.greaves"
		></ArmorItem>
	</div>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
}
.header {
	&__border {
		width: 64px;
		height: 64px;
	}
	&__icon {
		width: 60px;
		height: 60px;
	}
}
.line {
	width: 4px;
	background-color: c.$background-3;
	height: 64px;
	margin: -20px 0;
	z-index: -1;
}
</style>
