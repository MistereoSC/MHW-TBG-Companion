<script lang="ts" setup>
import Shield from '@/components/icons/Icon_Shield.vue'
import {type IWeapon, EWeapons, EWeaponsString} from '@/components/interfaces/items'

const props = defineProps<{
	item: IWeapon
	weapon_class: EWeapons
}>()
</script>

<template>
	<div class="container">
		<div class="item">
			<div class="item__header">
				<img
					:src="`/icons/weapons/${EWeaponsString[weapon_class]}_${item.rarity}.png`"
					class="item__header__icon"
				/>
				<h3 class="item__header__title">{{ item.name }}</h3>
				<img :src="`/icons/${item.icon}.png`" class="item__header__icon" />
			</div>

			<div class="separator"></div>

			<div class="item__parts">
				<div class="item__parts__element" v-for="(part, idx) in item.parts">
					<span class="item__parts__text">{{ part.amount }}x {{ part.name }}</span>
					<div class="item__parts__text__separator" v-if="idx < item.parts.length - 1"></div>
				</div>
				<div class="item__parts__element --default" v-if="item.parts.length == 0">
					<span class="item__parts__text --default">Starting Weapon</span>
				</div>
			</div>

			<div class="separator"></div>

			<div class="item__stats">
				<div class="item__stats__element --shield" v-if="item.armor">
					<Shield :stroke-width="2" fill="#deceb4" stroke="#626262">
						<span class="item__stats__number --dark">{{ item.armor }}</span>
					</Shield>
				</div>
				<div class="item__stats__element --shield" v-if="item.deviation !== undefined">
					<div class="item__stats__image">
						<img class="item__stats__icon" :src="`/icons/items/bullet_${item.deviation}.png`" />
					</div>
				</div>
				<div class="item__stats__element --icon" v-for="dmg in item.damage">
					<div class="item__stats__image">
						<img class="item__stats__icon" src="/icons/misc/damage_card.png" />
						<span class="item__stats__number">{{ dmg.value }}</span>
					</div>
					<span class="item__stats__amount">x{{ dmg.amount }}</span>
				</div>
			</div>

			<div class="separator"></div>

			<div class="item__deck__table" v-if="item.add.length > 0 || item.remove.length > 0">
				<div class="item__deck__column">
					<span class="item__deck__title">Remove</span>
					<div class="item__deck__column__content">
						<div class="item__deck__element" v-for="rem in item.remove">
							<span class="item__deck__text" v-if="rem.name.length > 0">
								{{ rem.amount }} {{ rem.name }}
							</span>
							<span class="item__deck__text" v-else>
								Any {{ rem.amount }} Card{{ rem.amount > 1 ? 's' : '' }}
							</span>
						</div>
					</div>
				</div>
				<div class="separator --vertical"></div>
				<div class="item__deck__column">
					<span class="item__deck__title">Add</span>
					<div class="item__deck__column__content">
						<div class="item__deck__element" v-for="add in item.add">
							<span class="item__deck__text">{{ add.amount }} {{ add.name }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="item__deck__table --single" v-else>
				<span class="item__deck__text --default">
					Use all starting deck cards to create your hunter attack deck.
				</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.item {
	width: 280px;
	padding: 8px 4px 0px 4px;
	background-color: c.$background-0;
	border: 2px solid c.$background-3;
	box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.5) inset;

	&__header {
		height: 36px;
		display: grid;
		grid-template-columns: auto 1fr auto;
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
			text-align: center;
		}
	}
	&__parts {
		height: 32px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;

		font-size: 12px;
		line-height: 1.1;
		text-align: center;

		&__element {
			display: flex;
			&.--default {
				height: 100%;
				display: grid;
				place-items: center;
			}
		}
		&__text {
			&__separator {
				width: 12px;
				height: 100%;
			}
		}
	}
	&__stats {
		display: flex;
		justify-content: center;
		gap: 8px;

		&__element {
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;

			&.--icon {
				width: 50px;
			}
		}
		&__image {
			position: relative;
			width: 100%;
			height: 100%;

			display: flex;
			align-items: center;

			& > span {
				padding-left: 13px;
				padding-top: 9px;
				font-size: 16px;
			}
		}
		&__icon {
			position: absolute;
			height: 100%;
			inset: 0 auto 0 0;
		}

		&__number {
			font-weight: bold;
			font-size: 20px;
			&.--dark {
				color: c.$text-dark;
			}
		}
		&__amount {
			align-self: flex-end;
			color: c.$text-mute;
		}
	}
	&__deck {
		&__table {
			min-height: 80px;
			margin-top: -6px;
			display: grid;
			grid-template-columns: 1fr 10px 1fr;
			&.--single {
				display: grid;
				place-items: center;
				grid-template-columns: auto;
				text-align: center;
				padding: 0 64px;
			}
		}
		&__column {
			&__content {
				height: 52px;
				padding-bottom: 4px;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
		&__element {
			line-height: 1;
		}
		&__text {
			font-size: 12px;
			line-height: 1;
		}
		&__title {
			font-size: 12px;
			line-height: 1;
			font-weight: bold;
			justify-self: flex-start;
		}
	}
}

.separator {
	height: 2px;
	width: auto;
	margin: 5px 0px;
	background-color: c.$background-3;

	&.--vertical {
		width: 2px;
		height: 100%;
		margin: 0px 4px;
	}
}
</style>
