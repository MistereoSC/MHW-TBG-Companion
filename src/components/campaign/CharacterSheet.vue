<script lang="ts" setup>
import {ref} from 'vue'
import {useCampaignStore} from '@/stores/campaign'
import type {IItem} from '@/components/interfaces/items'
import type {ICharacterData} from '@/components/interfaces/campaign'
import CharacterDeletion from './CharacterDeletion.vue'

const props = defineProps<{
	slot: number
}>()
const campaignStore = useCampaignStore()
const character = ref(
	JSON.parse(JSON.stringify(campaignStore.campaignData?.characters[props.slot])) as ICharacterData
)

const emit = defineEmits(['close'])

function updateCommonItem(mode: '+' | '-', item: IItem) {
	if (mode === '+') {
		if (item.amount < 99) {
			item.amount++
		}
	} else {
		if (item.amount > 0) {
			item.amount--
		}
	}
}

function save() {
	// character.value.hunter_name = inputHunterName.value
	// character.value.palico_name = inputPalicoName.value
	campaignStore.setCharacter(props.slot, character.value)
	emit('close')
}

const deleteModalOpen = ref(false)
function openDeleteModal() {
	deleteModalOpen.value = true
}
function cancelDelete() {
	deleteModalOpen.value = false
}
function confirmDelete() {
	campaignStore.deleteCharacter(props.slot)
	deleteModalOpen.value = false
	emit('close')
}
</script>

<template>
	<div class="frame scrollable" v-if="character">
		<div class="name">
			<span class="name__text">{{ character.hunter_name }}</span>
			<span class="name__subtext">& {{ character.palico_name }}</span>
			<button class="name__delete c-button__medium" @click="() => openDeleteModal()">Delete</button>
			<CharacterDeletion
				v-if="deleteModalOpen"
				:slot="slot"
				:hunter_name="character.hunter_name"
				@close="() => cancelDelete()"
				@confirm="() => confirmDelete()"
			/>
		</div>

		<div class="separator"></div>

		<div class="common">
			<h2 class="section__title">Common Bones, Ores and Hides:</h2>
			<div class="common__list">
				<div class="item" v-for="item in character.inventory.common">
					<div class="item__title">
						<img class="item__icon" :src="`/icons/items/${item.icon}_${item.color}.png`" />
						<span>{{ item.name }}</span>
					</div>
					<div class="item__amount">
						<button
							class="item__amount__button"
							:disabled="item.amount <= 0"
							@click="() => updateCommonItem('-', item)"
						>
							<span class="material-symbols-outlined"> remove </span>
						</button>
						<span class="item__amount__text">{{ item.amount }}</span>
						<button
							class="item__amount__button"
							:disabled="item.amount >= 99"
							@click="() => updateCommonItem('+', item)"
						>
							<span class="material-symbols-outlined"> add </span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="separator"></div>

		<div class="uncommon">
			<h2 class="section__title">Other Bones, Ores and Hides:</h2>
			<textarea class="textarea" v-model="character.inventory.uncommon"></textarea>
		</div>

		<div class="separator"></div>

		<div class="parts">
			<h2 class="section__title">Monster Parts:</h2>
			<textarea class="textarea" v-model="character.inventory.parts"></textarea>
		</div>

		<div class="separator"></div>

		<div class="inventory">
			<h2 class="section__title">Equipment:</h2>
			<textarea class="textarea" v-model="character.inventory.equipment"></textarea>
		</div>

		<button class="close-button c-button__icon" @click="() => save()">
			<span class="material-symbols-outlined"> close </span>
		</button>
	</div>
</template>

<style lang="scss" scoped>
.frame {
	position: relative;
	max-height: 90vh;
	padding: 1rem 4rem 4rem 4rem;
	overflow-y: scroll;

	display: flex;
	flex-direction: column;
}
.separator {
	height: 2px;
	background-color: c.$background-3;
	margin: 12px 0;
}
.textarea {
	// width: 100%;
	// max-width: 600px;
	width: 600px;
	min-height: 100px;
	background-color: transparent;
	border: 1px solid c.$background-3;
	outline: none;
	padding: 4px;
	font-weight: normal;
	font-size: 14px;
	resize: vertical;
}
.name {
	position: relative;
	&__text {
		font-weight: bold;
		font-size: 1.25rem;
	}
	&__subtext {
		font-size: 1rem;
		font-weight: normal;
		color: c.$text-mute;
		margin-left: 1rem;
	}
	&__delete {
		position: absolute;
		right: 0;
		padding: 6px !important;

		&:hover {
			border-color: c.$accent-red !important;
		}
	}
}
.common {
	&__list {
		max-height: 180px;
		max-width: 700px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 2px;
	}
}
.item {
	padding-right: 1em;
	width: 300px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&__icon {
		width: 24px;
		height: 24px;
	}
	&__title {
		display: flex;
		align-items: center;
	}
	&__amount {
		display: flex;
		align-items: center;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		&__button {
			display: grid;
			place-items: center;
			cursor: pointer;
			width: 24px;
			height: 24px;
			background-color: c.$background;
			border: 1px solid c.$background-3;
			& > span {
				cursor: pointer;
				font-size: 20px;
			}

			user-select: none;
			&[disabled] {
				pointer-events: none;
				& > span {
					color: c.$text-disabled;
				}
			}
		}
		&__text {
			width: 3ch;
			text-align: center;
			user-select: none;
		}
	}
}

.close-button {
	position: absolute;
	top: 8px;
	right: 8px;
}
</style>
