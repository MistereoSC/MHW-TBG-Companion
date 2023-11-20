<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {useCampaignStore} from '@/stores/campaign'
import CharacterSlot from '@/components/campaign/CharacterSlot.vue'
import BorderComponent from '../BorderComponent.vue'
const CHARACTER_SLOT_LIMIT = 16

const campaignStore = useCampaignStore()
const emit = defineEmits<{
	(e: 'create'): void
	(e: 'select', value: number): void
}>()

//#region Scroll Settings
onMounted(() => {
	const characterScroller = document.getElementById('id_character_scroller')
	if (!characterScroller) {
		console.error('ERR::: Render | Armor Sets - Scroll container non-existent')
		return
	} else {
		characterScroller.addEventListener('wheel', (e) => {
			if (!e.ctrlKey) {
				e.preventDefault
				characterScroller.scrollLeft += e.deltaY
			}
		})
		calculateCharacterSlotsWidth()
		window.addEventListener('resize', () => {
			calculateCharacterSlotsWidth()
		})
	}
})

function calculateCharacterSlotsWidth() {
	const menu = document.getElementById('id_menu_side')
	if (!menu) {
		console.error('ERR::: Render | Campaign Tracker - Could not find side-menu element')
		return
	}
	const characterScroller = document.getElementById('id_character_scroller')
	if (!characterScroller) {
		console.error('ERR::: Render | Campaign Tracker - Could not find character scroller element')
		return
	}

	const PADDING = 0
	const newWidth = window.innerWidth - menu.getBoundingClientRect().width - PADDING
	characterScroller.style.width = newWidth + 'px'
}
//#endregion
</script>

<template>
	<div class="tracker__characters">
		<div class="tracker__characters__content scrollable--minimal" id="id_character_scroller">
			<div class="tracker__characters__scroller">
				<BorderComponent
					v-for="(hunter, index) in campaignStore.campaignData?.characters"
					:enable_hover="true"
					class="tracker__characters__slot"
					@click="() => emit('select', index)"
				>
					<div class="tracker__characters__slot__content">
						<h3 class="tracker__characters__slot__title">{{ hunter.hunter_name }}</h3>
						<img :src="`/icons/${hunter.icon}.png`" class="tracker__characters__slot__icon" />
					</div>
				</BorderComponent>
				<div class="tracker__characters__slot">
					<button
						@click="() => emit('create')"
						class="tracker__characters__add"
						v-if="
							campaignStore.campaignData &&
							campaignStore.campaignData.characters.length < CHARACTER_SLOT_LIMIT
						"
					></button>
				</div>
			</div>
		</div>
		<div class="tracker__characters__blind --left"></div>
		<div class="tracker__characters__blind --right"></div>
	</div>
</template>

<style lang="scss" scoped>
.tracker {
	&__characters {
		position: relative;
		background-color: c.$background-0;
		border-top: 2px solid c.$background-3;
		border-bottom: 2px solid c.$background-3;

		width: 100%;
		&__scroller {
			display: flex;
			gap: 2rem;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: min-content;
			margin: 0 24px 0 48px;
		}
		&__content {
			width: 100%;
			position: relative;
			margin: auto;
			padding: 10px 50px 10px 50px;
			gap: 34px;
			overflow-y: hidden;
			overflow-x: scroll;
			margin: 12px 0 6px 0;
		}
		&__slot {
			width: 128px;
			height: 128px;
			&:hover {
				.tracker__characters__add::before,
				.tracker__characters__add::after {
					background-color: c.$text;
				}
				.tracker__characters__slot__icon {
					opacity: 0.7;
				}
			}
			&__content {
				background-color: c.$background-00;
				height: 100%;
				width: 100%;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}
			&__title {
				width: 100%;
				background-color: rgba($color: c.$background-00, $alpha: 0.5);
				text-align: center;
				z-index: 1;
				font-size: 1.2rem;
				padding: 2px 6px;
			}
			&__icon {
				position: absolute;
				top: 0;
				width: 112px;
				height: 112px;
				transition: opacity 0.2s ease-out;
				opacity: 0.2;
				margin: 6px;
				z-index: 0;
			}
		}
		&__add {
			width: 100%;
			height: 100%;
			position: relative;
			cursor: pointer;
			&::after {
				content: '';
				position: absolute;
				background-color: c.$text-disabled;
				transition: background-color 0.2s ease-out;
				inset: 20px 55px;
			}
			&::before {
				content: '';
				position: absolute;
				background-color: c.$text-disabled;
				transition: background-color 0.2s ease-out;
				inset: 55px 20px;
			}
		}
		&__blind {
			position: absolute;
			inset: 0 auto 12px 0;
			width: 100px;
			background: linear-gradient(
				90deg,
				c.$background-0 0%,
				c.$background-0 20%,
				rgba($color: c.$background-0, $alpha: 0) 100%
			);

			&.--right {
				inset: 0 0 12px auto;
				background: linear-gradient(
					-90deg,
					c.$background-0 0%,
					c.$background-0 20%,
					rgba($color: c.$background-0, $alpha: 0) 100%
				);
			}
		}
	}
}
</style>
