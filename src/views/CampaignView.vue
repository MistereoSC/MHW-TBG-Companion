<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {useCampaignStore} from '@/stores/campaign'
import SelectSlotView from '@/components/campaign/SelectSlotView.vue'
import CharacterOverview from '@/components/campaign/CharacterOverview.vue'
import Modal from '@/components/Modal.vue'

const campaignStore = useCampaignStore()

const slotSelectionOpen = ref(campaignStore.campaignData ? false : true)
function onSlotSelect(slot: number) {
	const slotData = campaignStore.loadSlot(slot)
	if (!slotData) return
	slotSelectionOpen.value = false
}

const modalCharacterOpen = ref(false)

function selectCharacter(slot: number) {}
function createCharacter() {
	newHunterName.value = ''
	newHunterPalico.value = ''
	modalCharacterOpen.value = true
}
const newHunterName = ref('')
const newHunterPalico = ref('')
function confirmCreateCharacter() {
	campaignStore.createNewCharacter(newHunterName.value, newHunterPalico.value)
	modalCharacterOpen.value = false
}
</script>

<template>
	<div class="page">
		<div class="page__select" v-if="slotSelectionOpen">
			<SelectSlotView @select-slot="onSlotSelect" />
		</div>
		<div class="page__tracker scrollable" v-else>
			<div class="tracker">
				<div class="tracker__title">
					<h1>{{ campaignStore.campaignData?.title }}</h1>
				</div>
				<div class="tracker__days"></div>
				<CharacterOverview
					@create="() => createCharacter()"
					@select="(slot) => selectCharacter(slot)"
				></CharacterOverview>
			</div>
			<Modal v-if="modalCharacterOpen" @close="modalCharacterOpen = false">
				<div class="modal__content">
					<div class="modal__title">
						<h2 class="modal__title__text">Create Character</h2>
					</div>
					<input
						type="text"
						class="modal__input c-input__underline"
						placeholder="Hunter Name"
						v-model="newHunterName"
						autofocus
					/>
					<input
						type="text"
						class="modal__input c-input__underline"
						placeholder="Palico Name"
						v-model="newHunterPalico"
						autofocus
					/>
					<button
						class="modal__confirm c-button__medium"
						:disabled="newHunterName.length < 3 || newHunterPalico.length < 3"
						@click="confirmCreateCharacter"
					>
						Embark
					</button>
				</div></Modal
			>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	width: 100%;
	&__select {
		height: 100vh;
	}
	&__tracker {
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
}
.tracker {
	min-height: 100vh;
}

.modal {
	&__content {
		padding: 8px 16px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		min-width: 360px;
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
}
</style>
