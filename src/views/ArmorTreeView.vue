<script lang="ts" setup>
//@ts-ignore
import ArmorSetsByExpansion from '@/assets/data/armor.json'
import {onMounted} from 'vue'
import ArmorSet from '@/components/trees/ArmorSet.vue'

const PAGE_DIRECTION = 'horizontal' as 'horizontal' | 'vertical'

onMounted(() => {
	if (PAGE_DIRECTION === 'horizontal') {
		const scrollContainer = document.getElementById('id_armor_sets_scroll_container')
		if (!scrollContainer) {
			console.error('ERR::: Render | Armor Sets - Scroll container non-existent')
			return
		}
		scrollContainer.addEventListener('wheel', (e) => {
			e.preventDefault()
			scrollContainer.scrollLeft += e.deltaY
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

			<div class="separator"></div>

			<div class="set" v-for="set in ArmorSetsByExpansion.ancient_forest">
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>

			<div class="separator"></div>

			<div class="set" v-for="set in ArmorSetsByExpansion.wildspire_waste">
				<ArmorSet
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></ArmorSet>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: 100%;
}
.content {
	height: 100vh;
	width: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px 40px 10px 50px;
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
			background-color: lime;
			outline: 2px solid red;
		}
	}
}
</style>
