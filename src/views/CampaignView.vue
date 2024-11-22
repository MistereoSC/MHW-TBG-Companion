<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {useCampaignStore} from '@/stores/campaign'
import {EColors, EColorsHex, EWeaponIcons, EWeaponIconsArr} from '@/components/icons/icon_helper'
import SelectSlotView from '@/components/campaign/SelectSlotView.vue'
import CharacterSheet from '@/components/campaign/CharacterSheet.vue'
import CharacterOverview from '@/components/campaign/CharacterOverview.vue'
import DayTracker from '@/components/campaign/DayTracker.vue'
import Modal from '@/components/Modal.vue'
import Counter from '@/components/Counter.vue'

const campaignStore = useCampaignStore()

const slotSelectionOpen = ref(campaignStore.campaignData ? false : true)
function onSlotSelect(slot: number | null) {
	const slotData = campaignStore.loadSlot(slot)
	if (!slotData) {
		slotSelectionOpen.value = true
		return
	}

	potionCount.value = slotData.potions
	slotSelectionOpen.value = false
}

const modalCharacterCreateOpen = ref(false)
const selectedCharacter = ref(-1)
const selectedColor = ref(EColors.White)
const selectedIcon = ref(EWeaponIconsArr[0])
function selectIcon(icon: string) {
	selectedIcon.value = icon
}
function selectColor(color: EColors) {
	selectedColor.value = color
}
function selectCharacter(slot: number) {
	selectedColor.value = EColors.White
	selectedIcon.value = EWeaponIconsArr[0]
	selectedCharacter.value = slot
}
function closeSelectCharacter() {
	selectedCharacter.value = -1
}
function createCharacter() {
	newHunterName.value = ''
	newHunterPalico.value = ''
	modalCharacterCreateOpen.value = true
}
const newHunterName = ref('')
const newHunterPalico = ref('')
function confirmCreateCharacter() {
	const icon = `weapons/${selectedIcon.value}_${selectedColor.value}`
	campaignStore.createNewCharacter(newHunterName.value, newHunterPalico.value, icon)
	modalCharacterCreateOpen.value = false
}

const potionCount = ref(campaignStore.getPotions())
watch(
	() => potionCount.value,
	(newVal) => {
		campaignStore.setPotions(newVal)
	}
)
</script>

<template>
	<div class="page">
		<div class="page__select" v-if="slotSelectionOpen">
			<SelectSlotView @select-slot="onSlotSelect" />
		</div>
		<div class="page__character scrollable" v-else-if="campaignStore.campaignData">
			<div class="character">
				<div class="character__title">
					<h1 class="character__title__text">{{ campaignStore.campaignData.title }}</h1>
					<button
						class="character__title__button c-button__medium"
						@click="() => onSlotSelect(null)"
					>
						Return
					</button>
				</div>
				<CharacterOverview
					@create="() => createCharacter()"
					@select="(slot) => selectCharacter(slot)"
				/>
				<div class="page__tracker">
					<div class="page__tracker__potions">
						<Counter v-model="potionCount" title="Potions" icon="icon_potion" :max_amount="99" />
					</div>
					<div class="page__tracker__days">
						<DayTracker />
					</div>
				</div>
			</div>
			<Modal v-if="modalCharacterCreateOpen" @close="modalCharacterCreateOpen = false">
				<div class="modal__content">
					<div class="modal__title">
						<h2 class="modal__title__text">Create Character</h2>
					</div>
					<input
						type="text"
						class="modal__input c-input__underline"
						placeholder="Hunter Name"
						v-model="newHunterName"
						v-autofocus
					/>
					<input
						type="text"
						class="modal__input c-input__underline"
						placeholder="Palico Name"
						v-model="newHunterPalico"
					/>
					<div class="modal__icon-selection">
						<h3 class="modal__icon-selection__title">Select Icon</h3>
						<div class="modal__icon-selection__content">
							<div
								class="modal__icon-selection__element"
								v-for="icon in EWeaponIconsArr"
								:active="selectedIcon == icon"
								@click="() => selectIcon(icon)"
							>
								<img class="modal__icon-selection__icon" :src="`/icons/weapons/${icon}_0.png`" />
							</div>
						</div>
					</div>
					<div class="modal__color-selection">
						<h3 class="modal__color-selection__title">Select Color</h3>
						<div class="modal__color-selection__content">
							<div
								class="modal__color-selection__element"
								v-for="(color, value, index) in EColorsHex"
								:active="selectedColor == index"
								@click="() => selectColor(index)"
							>
								<div class="modal__color-selection__color" :style="{backgroundColor: color}"></div>
							</div>
						</div>
					</div>

					<button
						class="modal__confirm c-button__medium"
						:disabled="newHunterName.length < 3 || newHunterPalico.length < 3"
						@click="confirmCreateCharacter"
					>
						Embark
					</button>
				</div>
			</Modal>
			<Modal v-if="selectedCharacter >= 0" @close="closeSelectCharacter" :hide_close_button="true">
				<CharacterSheet @close="closeSelectCharacter" :slot="selectedCharacter" />
			</Modal>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	width: 100%;
	&__select {
		height: 100vh;
	}
	&__character {
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
	&__tracker {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;

		margin-top: 2rem;
	}
}
.character {
	min-height: 100vh;
	&__title {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 1rem 0;
		&__text {
			font-size: 2rem;
			padding: 0 1rem;
			border-top: 2px solid c.$text;
			border-bottom: 2px solid c.$text;
		}
		&__button {
			position: absolute;
			right: 1rem;
		}
	}
}

.modal {
	&__content {
		padding: 8px 16px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		width: 400px;
	}
	&__title {
		padding: 0 64px 0 0;
		display: flex;
		align-items: center;
		gap: 12px;
		&__subtext {
			margin-top: 5px;
			color: c.$text-mute;
			font-size: 1rem;
		}
	}
	&__icon-selection {
		&__title {
			text-align: center;
		}
		&__content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 1rem;
		}
		&__element {
			width: 36px;
			height: 36px;
			cursor: pointer;
			border: 2px solid c.$background-3;

			&[active='true'] {
				border-color: c.$accent-green;
			}
		}
		&__icon {
			width: 32px;
			height: 32px;
		}
	}
	&__color-selection {
		&__title {
			text-align: center;
		}
		&__content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 1rem;
		}
		&__element {
			cursor: pointer;
			border: 2px solid c.$background-3;

			&[active='true'] {
				border-color: c.$accent-green;
			}
		}
		&__color {
			width: 18px;
			height: 18px;
			margin: 3px;
		}
	}
}
</style>
