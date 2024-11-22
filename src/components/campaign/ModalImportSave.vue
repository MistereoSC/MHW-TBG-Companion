<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import type {ICampaignData} from '@/components/interfaces/campaign'
import {validateSave} from '@/components/interfaces/helpers/saveValidator'
import {ref} from 'vue'

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'success', data: ICampaignData): void
}>()
const props = defineProps<{
	slotNumber: number,
}>()

const state = ref('await' as 'await' | 'invalid')
const isLoading = ref(false)
const dragActive = ref(false)
const errorReason = ref(null as null | 'invalid_filetype' | 'wrong_json' | 'corrupt_json')

function onItemEnter(e: DragEvent) {
	dragActive.value = true
}

function onItemLeave() {
	dragActive.value = false
}

async function onItemDrop(e: DragEvent) {
	dragActive.value = false
	if (isLoading.value == true) return
	if (!e.dataTransfer) return

	const items = [...e.dataTransfer.items]
	if (items.length !== 1) return
	if (items[0].kind !== 'file') return
	const file = items[0].getAsFile()
	if (!file) return
	if (file.type !== 'application/json') {
		state.value = 'invalid'
		errorReason.value = 'invalid_filetype'
		return
	}
	isLoading.value = true

	let validatedSave = undefined
	try {
		const json = await readFile(file)
		try {
			validatedSave = validateSave(json)
		} catch (error) {
			console.error('Error interpreting JSON:', error)
			isLoading.value = false
			errorReason.value = 'corrupt_json'
			return
		}
	} catch (error) {
		console.error('Error interpreting JSON:', error)
		isLoading.value = false
		errorReason.value = 'corrupt_json'
		return
	}

	isLoading.value = false
	if (validatedSave == undefined) {
		state.value = 'invalid'
		errorReason.value = 'wrong_json'
		return
	}

	emit('success', validatedSave)

	async function readFile(file: File) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = async (e) => {
				try {
					//@ts-ignore
					const data = JSON.parse(e.target.result)
					resolve(data)
				} catch (error) {
					console.error('Error parsing JSON:', error)
					reject(error)
				}
			}
			reader.onerror = (error) => {
				reject(error)
			}
			reader.readAsText(file)
		})
	}
}

</script>

<template>
	<Modal @close="emit('close')">
		<div class="import">
			<h2 class="import__title">Import Save from File</h2>
			<div class="import__upload"
					 :class="{active: !isLoading && dragActive, error: state == 'invalid'}"
					 @dragenter.stop.prevent="(e) => onItemEnter(e)"
					 @dragleave.stop.prevent="onItemLeave"
					 @dragover.prevent
					 @drop.stop.prevent="(e) => onItemDrop(e)">

				<div class="import__upload__content import__upload__drop">
					<div class="import__upload__title">
						<span class="import__upload__title__error"
									v-if="errorReason=='invalid_filetype'">Invalid FileType</span>
						<span class="import__upload__title__error"
									v-else-if="errorReason=='wrong_json'">Incompatible JSON File</span>
						<span class="import__upload__title__error"
									v-else-if="errorReason=='corrupt_json'">JSON is corrupt or malformed</span>
					</div>
					<img src="/icons/action_upload.png" class="import__upload__img">
					<p class="import__upload__label">Drop Savefile here</p>
				</div>

				<div class="import__upload__load" v-if="isLoading">
					<div class="import__upload__load__spinner"></div>
				</div>

			</div>

		</div>
	</Modal>
</template>

<style lang="scss" scoped>
.import {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 32px 64px 64px 64px;

	&__title {
		padding: 16px 0 32px 0;
		font-size: 2rem;
	}

	&__upload {
		overflow: hidden;
		position: relative;
		$size: 256px;
		width: $size;
		height: $size;;
		border: 3px dashed c.$background-3;
		background-color: c.$background-0;
		border-radius: 16px;
		transition: border-color 0.2s ease-in-out, background-corlor 0.2s ease-in-out;

		&.active {
			border-color: c.$text !important;

			.import__upload__img {
				filter: brightness(1) invert(0) sepia(0) saturate(1) hue-rotate(0) contrast(1);
			}
		}

		&.error {
			border-color: c.$accent-red;

			.import__upload__img {
				filter: brightness(0) invert(7%) sepia(68%) saturate(50) hue-rotate(30deg) contrast(111%);
			}

			.import__upload__title__error {
				color: c.$accent-red;
			}

			&.active {
				.import__upload__img {
					filter: brightness(0) invert(7%) sepia(68%) saturate(200) hue-rotate(30deg) contrast(111%);
				}
			}
		}

		&__label {
			color: c.$text-mute;
		}

		&__content {
			pointer-events: none;
			height: 100%;
			width: 100%;
			display: grid;
			grid-template-rows: 1fr 128px 1fr;
			place-items: center;
		}

		&__img {
			width: 128px;
			height: 128px;
			margin: auto;
			filter: brightness(1) invert(0.8) sepia(0) saturate(1) hue-rotate(0) contrast(1);
			-webkit-transition: 0.2s -webkit-filter linear;
			-moz-transition: 0.2s -moz-filter linear;
			-moz-transition: 0.2s filter linear;
			-ms-transition: 0.2s -ms-filter linear;
			-o-transition: 0.2s -o-filter linear;
			transition: 0.2s filter linear, 0.2s -webkit-filter linear;
		}

		&__load {
			pointer-events: none;
			position: absolute;
			inset: 0;
			display: grid;
			place-items: center;
			background-color: #000000E0;

			&__spinner {
				width: 72px;
				height: 72px;
				border: 12px solid c.$text;
				border-top: 12px solid transparent;
				border-radius: 100%;
				animation: rotating 1s linear infinite;
			}
		}
	}
}

@keyframes rotating {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
