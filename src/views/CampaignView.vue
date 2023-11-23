<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {useCampaignStore} from '@/stores/campaign'
import SelectSlotView from '@/components/campaign/SelectSlotView.vue'
import CharacterSheet from '@/components/campaign/CharacterSheet.vue'
import CharacterOverview from '@/components/campaign/CharacterOverview.vue'
import Modal from '@/components/Modal.vue'

const campaignStore = useCampaignStore()

const slotSelectionOpen = ref(campaignStore.campaignData ? false : true)
function onSlotSelect(slot: number) {
	const slotData = campaignStore.loadSlot(slot)
	if (!slotData) return
	slotSelectionOpen.value = false
}

const modalCharacterCreateOpen = ref(false)
const selectedCharacter = ref(-1)
function selectCharacter(slot: number) {
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
	campaignStore.createNewCharacter(newHunterName.value, newHunterPalico.value)
	modalCharacterCreateOpen.value = false
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
					<h1 class="tracker__title__text">{{ campaignStore.campaignData?.title }}</h1>
				</div>
				<div class="tracker__days"></div>
				<CharacterOverview
					@create="() => createCharacter()"
					@select="(slot) => selectCharacter(slot)"
				></CharacterOverview>
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
	&__tracker {
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
}
.tracker {
	min-height: 100vh;
	&__title {
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
	}
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
