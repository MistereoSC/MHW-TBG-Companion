<script lang="ts" setup>
//@ts-ignore
import ArmorSets from '@/assets/data/armor.json'
import {onMounted} from 'vue'
import ArmorSet from '@/components/trees/ArmorSet.vue'

// const TEST = new Array(12).fill(ArmorSets[0])
</script>

<template>
	<div class="page">
		<div class="content scrollable">
			<div class="set" v-for="set in ArmorSets">
				<ArmorSet :set="set"></ArmorSet>
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
	align-items: center;
	padding: 10px 40px 10px 50px;
	gap: 34px;

	overflow-x: scroll;
}
</style>
