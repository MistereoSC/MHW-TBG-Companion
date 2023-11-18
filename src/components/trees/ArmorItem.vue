<script lang="ts" setup>
import type {IArmor} from '@/components/interfaces/items'
import Shield from '@/components/icons/Icon_Shield.vue'
import Pentagon from '@/components/icons/Icon_Pentagon.vue'
import Tooltip from '@/views/Tooltip.vue'

const props = defineProps<{
	item: IArmor
	name: string
	rarity: number
	type: 'helm' | 'mail' | 'greaves'
}>()

function getFillColor(element: string) {
	switch (element) {
		case 'fire':
			return '#e3031c'
		case 'water':
			return '#2e619b'
		case 'thunder':
			return '#f8e72d'
		case 'ice':
			return '#99f1e1'
		case 'dragon':
			return '#4100f5'
		default:
			return undefined
	}
}
function getTooltipText(text: string) {
	const out = text.replace(/\$([^\$]*)\$/g, genHtmlImg('$1'))
	return out
}

function genHtmlImg(str: string) {
	const path = `/icons/${str}.png`
	return `<img src="${path}" style="max-width: 16px; max-height: 16px;"/>`
}
</script>

<template>
	<div class="container">
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
					<Shield :stroke-width="2" fill="#deceb4" stroke="#626262">
						<span class="item__stats__text --dark">{{ item.armor }}</span>
					</Shield>
				</div>
				<div class="item__stats__element" v-if="item.resistance">
					<Pentagon :stroke-width="2" :fill="getFillColor(item.resistance.type)">
						<span
							class="item__stats__text"
							:class="{
								'--dark': item.resistance.type == 'thunder' || item.resistance.type == 'ice',
							}"
							>{{ item.resistance.amount }}</span
						>
					</Pentagon>
				</div>
			</div>

			<div class="separator"></div>

			<div class="item__effect">
				<span>{{ item.effect?.name }}</span>
				<Tooltip class="tooltip" position="top" v-if="item.effect">
					<div class="tooltip-content">
						<span v-html="getTooltipText(item.effect.description)"></span>
					</div>
				</Tooltip>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.item {
	width: 170px;
	padding: 8px 4px;
	background-color: c.$background-0;
	border: 2px solid c.$background-3;
	box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.5) inset;

	&__header {
		height: 36px;
		display: flex;
		align-items: center;
		gap: 8px;
		&__icon {
			width: 25px;
			height: 25px;
		}
		&__title {
			font-size: 16px;
			font-weight: 600;
			line-height: 1;
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
			&.--dark {
				color: c.$text-dark;
			}
		}
	}

	&__effect {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 28px;
		font-size: 14px;
		line-height: 1;
		text-align: center;

		&:not(:hover) {
			.tooltip {
				display: none;
			}
		}
	}
}

.separator {
	height: 2px;
	width: auto;
	margin: 5px 0px;
	background-color: c.$background-3;
}

.tooltip-content {
	text-align: justify;
	text-align-last: center;
	line-height: 1.25;
	font-size: 16px;
	width: max-content;
	max-width: 200px;
}
</style>
