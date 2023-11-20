<script lang="ts" setup>
import type {IArmorSet} from '@/components/interfaces/items'
import ArmorItem from './ArmorItem.vue'
import BorderComponent from '../BorderComponent.vue'

const props = defineProps<{
	set: IArmorSet
	direction?: 'horizontal' | 'vertical'
}>()
</script>

<template>
	<div class="container" :class="{'direction-horizontal': props.direction == 'horizontal'}">
		<BorderComponent class="header__border" :blur_radius="10">
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
.line {
	width: 4px;
	background-color: c.$background-3;
	height: 64px;
	margin: -20px 0;
	z-index: -1;
}
.container:not(.container.direction-horizontal) {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
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
		width: 64px;
		background-color: c.$background-3;
		height: 4px;
		margin: 0 -20px;
		z-index: -1;
	}
}
</style>
