<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import type {ICampaignDay} from '../interfaces/campaign'
import {useCampaignStore} from '@/stores/campaign'
import {EMonsterArr} from '../icons/icon_helper'
import Modal from '../Modal.vue'

const campaignStore = useCampaignStore()
const max_days = ref(0)
const days = ref([] as Array<ICampaignDay>)
onMounted(() => {
	if (campaignStore.campaignData) {
		max_days.value = campaignStore.campaignData.max_days
		days.value = campaignStore.campaignData.days
	}
})

function getIcon(day: number) {
	const dayData = days.value[day - 1]
	if (!dayData) return ''
	return `/icons/${dayData.icon}.png`
}

const dayModalOpen = ref(false)
const selectedIcon = ref(0)
const selectedDay = ref(-1)
function openDayModal(day: number) {
	if (day - 1 !== days.value.length) return
	selectedIcon.value = 0
	selectedDay.value = day
	dayModalOpen.value = true
}
function cancelDay() {
	selectedDay.value = -1
	dayModalOpen.value = false
}

function confirmDay() {
	const day = selectedDay.value
	if (day < 0) return
	if (day - 1 !== days.value.length) return

	const newDay: ICampaignDay = {
		day: day,
		type: 'hunt',
		icon: '',
	}
	if (selectedIcon.value >= EMonsterArr.length) {
		newDay.type = 'downtime'
		newDay.icon = downtimeIcons[selectedIcon.value - EMonsterArr.length]
	} else {
		newDay.icon = `monsters/${EMonsterArr[selectedIcon.value]}`
	}
	campaignStore.registerCampaignDay(newDay)
	selectedDay.value = -1
	dayModalOpen.value = false
}

function selectIcon(icon: number) {
	selectedIcon.value = icon
}

const downtimeIcons = ['items/ore_2', 'items/bone_1', 'misc/food', 'icon_quest', 'misc/quest_cat']
</script>

<template>
	<div class="days">
		<h3 class="days__title">Campaign Day Activities</h3>
		<div class="days__list">
			<div class="days__element" v-for="day in max_days">
				<div class="days__item --default" v-if="days[day - 1] !== undefined">
					<img class="days__item__icon" :src="getIcon(day)" />
					<span class="days__item__number">{{ day }}</span>
				</div>
				<div
					class="days__item --empty"
					:class="{'--last-active': day - 1 == days.length}"
					@click="() => openDayModal(day)"
					v-else
				>
					<span class="days__item__number">{{ day }}</span>
				</div>
			</div>
		</div>

		<Modal v-if="dayModalOpen" @close="() => cancelDay()">
			<div class="modal">
				<h2 class="modal__title">- Day {{ selectedDay }} -</h2>
				<h3 class="modal__subtitle">Select an Icon:</h3>
				<p class="modal__text">Hunting Quest</p>

				<div class="modal__icons">
					<div
						class="modal__icons__element"
						v-for="idx in EMonsterArr.length"
						:active="idx - 1 == selectedIcon"
						@click="() => selectIcon(idx - 1)"
					>
						<img
							class="modal__icons__element__icon"
							:src="`/icons/monsters/${EMonsterArr[idx - 1]}.png`"
						/>
					</div>
				</div>
				<p class="modal__text">Downtime Activity</p>
				<div class="modal__icons">
					<div
						class="modal__icons__element"
						v-for="(icon, idx) in downtimeIcons"
						:active="idx + EMonsterArr.length == selectedIcon"
						@click="() => selectIcon(idx + EMonsterArr.length)"
					>
						<img class="modal__icons__element__icon" :src="`/icons/${icon}.png`" />
					</div>
				</div>

				<div class="modal__buttons">
					<button class="c-button__medium" @click="() => confirmDay()">Confirm</button>
					<button class="c-button__medium" @click="() => cancelDay()">Cancel</button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
.days {
	padding: 12px 24px 24px 24px;
	border: 2px solid c.$background-3;
	background-color: c.$background-0;
	&__list {
		max-width: 768px;
		display: grid;
		grid-template-columns: repeat(auto-fit, 64px);
		justify-content: center;
	}
	&__element {
		box-sizing: content-box;
		width: 64px;
		height: 48px;
		border-top: 1px solid white;
		border-bottom: 1px solid white;
		margin-top: -1px;

		display: grid;
		place-items: center;
	}
	&__item {
		width: 100%;
		height: 100%;
		position: relative;
		display: grid;
		place-items: center;
		&.--empty {
			.days__item__number {
				color: c.$text-disabled;
				font-size: 1.5rem;
			}
		}
		&.--last-active {
			&:hover {
				background-color: c.$background-1;
			}
			.days__item__number {
				color: c.$accent-blue;
				cursor: pointer;
				font-size: 2rem;
			}
			cursor: pointer;
		}
		&.--default {
			.days__item__number {
				color: c.$text;
				font-size: 1.5rem;
				text-align: center;
			}
		}

		&__icon {
			position: absolute;
			width: 40px;
			height: 40px;

			opacity: 0.5;
		}
	}
}

.modal {
	padding: 20px;
	max-width: 400px;
	display: flex;
	align-items: center;
	flex-direction: column;
	&__text {
		color: c.$text-mute;
	}
	&__icons {
		margin-bottom: 1rem;
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		justify-content: center;
		&__element {
			cursor: pointer;
			width: 42px;
			height: 42px;
			display: grid;
			place-items: center;
			border: 2px solid c.$background-3;
			&[active='true'] {
				border-color: c.$accent-green;
			}

			&__icon {
				width: 34px;
				height: 34px;
			}
		}
	}
	&__buttons {
		display: flex;
		gap: 2rem;
		margin-top: 1rem;
	}
}
</style>
