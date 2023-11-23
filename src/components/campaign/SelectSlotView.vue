<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import BorderComponent from '@/components/BorderComponent.vue'
import Modal from '@/components/Modal.vue'
import {useCampaignStore} from '@/stores/campaign'

const campaignStore = useCampaignStore()
const previews = campaignStore.getSlotPreviews()
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
	if (previews[value]) {
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
	emit('selectSlot', selectedSlot.value)
}
function closeModal() {
	selectedSlot.value = null
	modalOpen.value = false
}
</script>

<template>
	<div class="page">
		<div class="top">
			<h1 class="top__title">Select Save Slot</h1>
			<div class="top__content">
				<div class="slot" v-for="index in 3">
					<BorderComponent :enable_hover="true" class="slot" @click="() => selectSlot(index - 1)">
						<div
							class="slot__add"
							v-if="
								//@ts-ignore
								!previews[index - 1]
							"
						></div>
						<div class="slot__content" v-else>
							<h3 class="slot__title">
								{{
									//@ts-ignore
									previews[index - 1].title
								}}
							</h3>
							<img
								:src="`/icons/${
									//@ts-ignore
									previews[index - 1].icon
								}.png`"
								class="slot__icon"
							/>
						</div>
					</BorderComponent>
				</div>
			</div>
		</div>
		<div class="bottom"></div>
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
					autofocus
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
