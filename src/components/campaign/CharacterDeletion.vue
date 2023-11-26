<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import Modal from '../Modal.vue'

const props = defineProps<{
	slot: number
	hunter_name: string
}>()
const emit = defineEmits(['close', 'confirm'])
onMounted(() => {
	return
})

const inputName = ref('')
function confirm() {
	if (inputName.value !== props.hunter_name) return
	emit('confirm')
}
</script>

<template>
	<Modal @close="() => emit('close')">
		<div class="delete">
			<h3 class="delete__title">Delete Hunter</h3>
			<p class="delete__text">
				Are you sure you want to permanently delete {{ hunter_name }}? To confirm, type
				<span class="delete__highlight">{{ hunter_name }}</span> below:
			</p>
			<input
				v-autofocus
				type="text"
				class="c-input__underline"
				v-model="inputName"
				placeholder="Are  you sure ?"
			/>
			<div class="delete__buttons">
				<button
					class="c-button__medium delete__buttons__confirm"
					@click="() => confirm()"
					:disabled="inputName !== hunter_name"
				>
					Confirm
				</button>
				<button class="c-button__medium" @click="() => emit('close')">Cancel</button>
			</div>
		</div>
	</Modal>
</template>

<style lang="scss" scoped>
.delete {
	width: 400px;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	&__buttons {
		width: 100%;
		display: flex;
		justify-content: space-evenly;

		&__confirm:not(.delete__buttons__confirm[disabled]) {
			&:hover {
				border-color: c.$accent-red !important;
			}
		}

		button {
			width: 85px;
		}
	}

	&__highlight {
		font-weight: bold;
		color: c.$accent-blue;
	}
}
</style>
