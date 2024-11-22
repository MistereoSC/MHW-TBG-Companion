<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import BorderComponent from '@/components/BorderComponent.vue'
import Modal from '@/components/Modal.vue'
import {useCampaignStore} from '@/stores/campaign'
import type {ICampaignData} from '@/components/interfaces/campaign'
import ModalImportSave from '@/components/campaign/ModalImportSave.vue'
import ModalDeleteSave from '@/components/campaign/ModalDeleteSave.vue'

const campaignStore = useCampaignStore()
let previews = campaignStore.getSlotPreviews()
onMounted(() => {
	campaignStore.loadSlot(null)
})

const emit = defineEmits<{
	(e: 'selectSlot', value: number): void
}>()

const modalOpen = ref(false)
const selectedSlot = ref(null as null | number)
const newCampaignName = ref('')

function selectSlot(value: number) {
	newCampaignName.value = ''
	selectedSlot.value = value
	//@ts-ignore
	if (previews[`slot_${value + 1}`]) {
		// LOAD CAMPAIGN
		campaignStore.loadSlot(value)
		emit('selectSlot', selectedSlot.value)
	} else {
		// CREATE CAMPAIGN
		modalOpen.value = true
	}
}

function confirmSlot() {
	if (selectedSlot.value === null) return
	campaignStore.createNewCampaign(selectedSlot.value, newCampaignName.value)
	modalOpen.value = false
	previews = campaignStore.getSlotPreviews()
	// emit('selectSlot', selectedSlot.value)
}

function closeModal() {
	selectedSlot.value = null
	modalOpen.value = false
}

// -----------------------------------------------------------------

const deleteModalOpenNumber = ref(null as null | number)
const deleteModalName = ref('')
const importModalOpenNumber = ref(null as null | number)

function clickDelete(slot: number) {
	// @ts-ignore
	const slotData = previews[`slot_${slot}`] as ICampaignData
	if (!slotData) return
	deleteModalOpenNumber.value = slot
	deleteModalName.value = slotData.title
}

function cancelDelete() {
	deleteModalOpenNumber.value = null
	deleteModalName.value = ''
}

function confirmDelete() {
	if (deleteModalOpenNumber.value === null) return
	campaignStore.deleteSlot(deleteModalOpenNumber.value - 1)
	deleteModalOpenNumber.value = null
	deleteModalName.value = ''
	previews = campaignStore.getSlotPreviews()
}


function clickImport(slot: number) {
	importModalOpenNumber.value = slot
}

function cancelImport() {
	importModalOpenNumber.value = null
}

function confirmImport(save: ICampaignData) {
	if (importModalOpenNumber.value == null) return
	campaignStore.importCampaignData(importModalOpenNumber.value - 1, save)
	previews = campaignStore.getSlotPreviews()
	importModalOpenNumber.value = null
}

function clickExport(slot: number) {
	// @ts-ignore
	const slotData = previews[`slot_${slot}`] as ICampaignData
	if (!slotData) return
	const file = new Blob([JSON.stringify(slotData)], {type: 'text/plain;charset=utf-8'})
	const filename = `MHW-BoardGame-Save-${slot}.json`

	const a = document.createElement('a')
	a.href = URL.createObjectURL(file)
	a.download = filename
	a.click()
}
</script>

<template>
	<div class="page">
		<div class="top">
			<h1 class="top__title">Select Save Slot</h1>
			<div class="top__content">
				<div v-for="index in 3">
					<BorderComponent :enable_hover="true" class="slot slot__border" @click="() => selectSlot(index - 1)">
						<div
							class="slot__add"
							v-if="
								//@ts-ignore
								!previews[`slot_${index}`]
							"
						></div>
						<div class="slot__content" v-else>
							<h3 class="slot__title">
								{{
									//@ts-ignore
									previews[`slot_${index}`].title
								}}
							</h3>
							<img
								:src="`/icons/${
									//@ts-ignore
									previews[`slot_${index}`].icon
								}.png`"
								class="slot__icon"
								alt="Save Slot Icon"
							/>
						</div>
					</BorderComponent>
					<div class="slot__actions">
						<button class="slot__actions__button" @click="() => clickExport(index)" title="Export to File" v-if="
									 /*@ts-ignore*/
									 previews[`slot_${index}`]
									">
							<img class="slot__actions__button__image" src="/icons/action_export.png" alt="Export Savegame" />
						</button>
						<button class="slot__actions__button" @click="() => clickImport(index)" title="Import from File" v-if="
									 /*@ts-ignore*/
									 !previews[`slot_${index}`]
									">
							<img class="slot__actions__button__image" src="/icons/action_import.png" alt="Import Savegame"
							/>
						</button>
						<button class="slot__actions__button" @click="() => clickDelete(index)" title="Delete Save" v-if="
									 /*@ts-ignore*/
									 previews[`slot_${index}`]
									">
							<img class="slot__actions__button__image" src="/icons/action_delete.png" alt="Delete Savegame"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">

		</div>
		<Modal v-if="modalOpen" @close="closeModal">
			<div class="modal__content">
				<div class="modal__title">
					<h2 class="modal__title__text">Create Campaign</h2>
					<span class="modal__title__subtext">(Slot #{{ selectedSlot! + 1 }})</span>
				</div>
				<input
					type="text"
					class="modal__input c-input__underline"
					placeholder="Campaign Name"
					v-model="newCampaignName"
					v-autofocus
				/>
				<button
					class="modal__confirm c-button__medium"
					:disabled="newCampaignName.length < 3"
					@click="confirmSlot"
				>
					Begin Journey
				</button>
			</div>
		</Modal>

		<ModalDeleteSave v-if="deleteModalOpenNumber != null" @close="cancelDelete" @confirm="confirmDelete"
										 :slot-number="deleteModalOpenNumber" :slot-name="deleteModalName" />
		<ModalImportSave v-if="importModalOpenNumber != null" :slot-number="importModalOpenNumber"
										 @close="cancelImport"
										 @success="(save) => confirmImport(save)"
		/>
	</div>
</template>

<style lang="scss" scoped>
.page {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: c.$background-00;

	display: grid;
	grid-template-rows: 1fr 30vh;
}

.top {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;

	&__title {
		font-size: 2.5rem;
		padding: 0 1em;
		border-top: 2px solid c.$text;
		border-bottom: 2px solid c.$text;
	}

	&__content {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 100px;
	}
}

.slot {
	width: 196px;
	height: 196px;

	&__content {
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	&__title {
		cursor: pointer;
		width: 100%;
		background-color: rgba($color: c.$background-00, $alpha: 0.9);
		text-align: center;
		z-index: 1;
		font-size: 1.5rem;
		padding: 2px 6px;
	}

	&__icon {
		position: absolute;
		top: 0;
		width: 170px;
		height: 170px;
		transition: opacity 0.2s ease-out;
		opacity: 0.2;
		margin: 12px;
		z-index: 0;
	}

	&__add {
		width: 100%;
		height: 100%;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			background-color: c.$text-disabled;
			transition: background-color 0.2s ease-out;
			inset: 52px 87px;
		}

		&::before {
			content: '';
			position: absolute;
			background-color: c.$text-disabled;
			transition: background-color 0.2s ease-out;
			inset: 87px 52px;
		}
	}

	&__border {
		&:hover {
			.slot__add::before,
			.slot__add::after {
				background-color: c.$text;
			}

			.slot__icon {
				opacity: 0.7;
			}
		}
	}


	&__actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 32px;
		padding-top: 16px;

		&__button {
			border: none;
			background-color: transparent;
			border-radius: 100%;
			width: 34px;
			height: 34px;
			display: grid;
			place-items: center;

			cursor: pointer;

			&__image {
				opacity: 0.05;
				width: 32px;
				height: 32px;
			}

			&:hover {
				.slot__actions__button__image {
					opacity: 0.5;
				}
			}
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

.bottom {
	width: 100%;
}
</style>
