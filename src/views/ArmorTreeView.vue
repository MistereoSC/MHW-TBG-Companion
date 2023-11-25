<script lang="ts" setup>
import ArmorSetsByExpansion from '@/assets/data/armor.json'
import {onMounted} from 'vue'
import ArmorSet from '@/components/trees/ArmorSet.vue'

import {useSettingsStore} from '@/stores/settings'
const settingsStore = useSettingsStore()

const PAGE_DIRECTION =
	settingsStore.settingsData?.general.armor_direction_vertical === true ? 'vertical' : 'horizontal'

onMounted(() => {
	if (PAGE_DIRECTION === 'horizontal') {
		const scrollContainer = document.getElementById('id_armor_sets_scroll_container')
		if (!scrollContainer) {
			console.error('ERR::: Render | Armor Sets - Scroll container non-existent')
			return
		}
		scrollContainer.addEventListener('wheel', (e) => {
			if (!e.ctrlKey) {
				e.preventDefault
				scrollContainer.scrollLeft += e.deltaY
			}
		})
	}
})
</script>

<template>
	<div class="page">
		<div
			class="content scrollable"
			:class="{'--vertical': PAGE_DIRECTION == 'vertical'}"
			id="id_armor_sets_scroll_container"
		>
			<div class="set" v-for="set in ArmorSetsByExpansion.basic">
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>

			<div
				class="separator"
				v-if="settingsStore.settingsData?.owned_expansions.ancient_forest"
			></div>

			<div
				class="set"
				v-for="set in ArmorSetsByExpansion.ancient_forest"
				v-if="settingsStore.settingsData?.owned_expansions.ancient_forest"
			>
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>

			<div
				class="separator"
				v-if="settingsStore.settingsData?.owned_expansions.wildspire_waste"
			></div>

			<div
				class="set"
				v-for="set in ArmorSetsByExpansion.wildspire_waste"
				v-if="settingsStore.settingsData?.owned_expansions.wildspire_waste"
			>
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>

			<div class="separator" v-if="settingsStore.ownsNonBaseExpansion()"></div>

			<div
				class="set"
				v-for="set in ArmorSetsByExpansion.kulu"
				v-if="settingsStore.settingsData?.owned_expansions.kulu"
			>
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>
			<div
				class="set"
				v-for="set in ArmorSetsByExpansion.teostra"
				v-if="settingsStore.settingsData?.owned_expansions.teostra"
			>
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>
			<div
				class="set"
				v-for="set in ArmorSetsByExpansion.nergigante"
				v-if="settingsStore.settingsData?.owned_expansions.nergigante"
			>
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>
			<div
				class="set"
				v-for="set in ArmorSetsByExpansion.kushala"
				v-if="settingsStore.settingsData?.owned_expansions.kushala"
			>
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>
		</div>

		<div class="blind --before" v-if="PAGE_DIRECTION == 'horizontal'"></div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: 100%;
}
.blind {
	width: 60px;

	position: absolute;

	&.--after {
		inset: 0 0 8px auto;
		background: linear-gradient(-90deg, rgba(24, 24, 24, 1) 0%, rgba(0, 0, 0, 0) 100%);
	}
	&.--before {
		inset: 0 auto 8px 0;
		background: linear-gradient(90deg, rgba(24, 24, 24, 1) 0%, rgba(0, 0, 0, 0) 100%);
	}
}
.content {
	position: relative;
	height: 100vh;
	width: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px 50px 10px 50px;
	gap: 34px;

	overflow-y: hidden;
	overflow-x: scroll;

	.separator {
		width: 0px;
		height: 100%;
		outline: 1px solid c.$background-1;
	}

	&.--vertical {
		flex-direction: column;
		overflow-y: scroll;
		overflow-x: hidden;
		.separator {
			width: 100%;
			height: 12px;
		}
	}
}
</style>
