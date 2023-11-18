<script lang="ts" setup>
import type {IArmor} from '@/components/interfaces/items'
import BorderComponent from '../BorderComponent.vue'
import Shield from '@/components/icons/Icon_Shield.vue'
import Pentagon from '@/components/icons/Icon_Pentagon.vue'

const props = defineProps<{
	item: IArmor
	name: string
	rarity: number
	type: 'helm' | 'mail' | 'greaves'
}>()

function getFillColor(element: string) {
	//TODO: set appropriate element colors
	switch (element) {
		case 'fire':
			return '#ff0000'
		case 'water':
			return '#0000ff'
		case 'thunder':
			return '#00ffff'
		case 'ice':
			return '#00aaff'
		case 'dragon':
			return '#ff00ff'
		default:
			return undefined
	}
}
</script>

<template>
	<div class="container">
		<BorderComponent :disable_hover="true">
			<div class="item">
				<div class="item__header">
					<img :src="`/icons/armor/${type}_${rarity}.png`" class="item__header__icon" />
					<h3 class="item__header__title">
						{{ name }}
					</h3>
				</div>

				<div class="separator"></div>

				<div class="item__parts">
					<div class="item__parts__element" v-for="part in item.parts">
						{{ part.amount }}x {{ part.name }}
					</div>
				</div>

				<div class="separator"></div>

				<div class="item__stats">
					<div class="item__stats__element">
						<Shield :stroke-width="2">
							<span class="item__stats__text">{{ item.armor }}</span>
						</Shield>
					</div>
					<div class="item__stats__element" v-if="item.resistance">
						<Pentagon :fill="getFillColor(item.resistance.type)">
							<span class="item__stats__text">{{ item.resistance.amount }}</span>
						</Pentagon>
					</div>
				</div>

				<div class="separator"></div>

				<div class="item__effect">{{ item.effect }}</div>
			</div>
		</BorderComponent>
	</div>
</template>

<style lang="scss" scoped>
.container {
}
.item {
	width: 170px;
	padding: 8px 8px;
	background-color: c.$background-0;
	&__header {
		height: 36px;
		display: flex;
		align-items: center;
		gap: 8px;
		&__icon {
			width: 28px;
			height: 28px;
		}
		&__title {
			font-size: 18px;
			font-weight: 600;
			line-height: 1;
			text-align: center;
		}
	}
	&__parts {
		height: 48px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		font-size: 12px;
		line-height: 1.1;
	}
	&__effect {
		display: grid;
		place-items: center;
		min-height: 28px;
		font-size: 14px;
		line-height: 1;
		text-align: center;
	}
	&__stats {
		display: flex;
		justify-content: center;
		gap: 12px;

		&__element {
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
		}

		&__text {
			font-weight: bold;
			font-size: 20px;
		}
	}
}

.separator {
	height: 2px;
	width: auto;
	margin: 5px 0px;
	background-color: c.$background-3;
}
</style>
