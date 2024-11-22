<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import {ref, watch} from 'vue'

const props = defineProps<{
	slotNumber: number
	slotName: string
}>()

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'confirm'): void
}>()

const confirmationInput = ref('')
const deleteValid = ref(false)

function confirmationOnKeyDown(e: KeyboardEvent) {
	if (e.key.length !== 1) return
	if (/^[A-Za-z]+$/.test(e.key)) return // Match with regex
	else e.preventDefault() // If not match, don't add to input text
}

watch(() => confirmationInput.value, (newValue, oldValue) => {
	deleteValid.value = validateInput(newValue)

	function validateInput(v: string) {
		return v.trim().toUpperCase() === 'DELETE'
	}
})

function onConfirm() {
	if (!deleteValid.value) return
	emit('confirm')
}

function onClose() {
	emit('close')
}
</script>

<template>
	<Modal @close="emit('close')">
		<div class="delete">
			<div class="delete__image"><img src="/icons/warn_cat_x.png" class="delete__image__img"></div>
			<div class="delete__message">Are you sure you want to delete save at
				<span class="delete__message__highlight">Slot {{ props.slotNumber }}</span> ?
			</div>
			<div class="delete__message">Your Save <span class="delete__message__highlight">{{ props.slotName }}</span> will
				be missed forever . . .
			</div>
			<div class="separator"></div>
			<div class="delete__confirmation">
				<div class="delete__confirmation__label">Type "<span
					class="delete__confirmation__highlight">DELETE</span>" to confirm.
				</div>
				<input type="text" class="delete__confirmation__input c-input__underline"
							 placeholder="Goodbye . . ."
							 v-model="confirmationInput"
							 @keydown="confirmationOnKeyDown"
							 :class="{'danger': deleteValid}"
				>
			</div>


			<div class="delete__buttons">
				<button class="delete__buttons__confirm c-button__medium" @click="onConfirm" :disabled="!deleteValid">
					Yes, delete...
				</button>
				<button class="delete__buttons__cancel c-button__medium" @click="onClose">
					No, keep!
				</button>
			</div>
		</div>
	</Modal>
</template>

<style lang="scss" scoped>
.delete {
	padding: 32px;

	&__image {
		width: 100%;
		display: flex;
		justify-content: center;
		padding-bottom: 16px;

		&__img {
			width: 156px;
			height: 156px;
		}
	}

	&__message {
		color: c.$text-mute;
	}

	&__confirmation {
		&__highlight {
			color: c.$accent-red;
		}

		&__input {
			text-transform: uppercase;
			transition: color 0.2s ease-out;

			&.danger {
				color: c.$accent-orange;
			}
		}
	}

	&__buttons {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		padding-top: 24px;
	}
}

.separator {
	height: 2px;
	width: auto;
	margin: 5px 0px;
	background-color: c.$background-3;
	opacity: 0.3;
	margin: 24px 0;
}
</style>
