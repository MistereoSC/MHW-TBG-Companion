<script lang="ts" setup>
const props = defineProps<{
	checked: boolean | null | undefined
	type?: 'dot-empty' | 'check-empty' | 'check-x'
	disabled?: boolean
}>()
const emit = defineEmits(['toggle'])
</script>

<template>
	<div class="checkbox" @click="() => emit('toggle')">
		<div class="checkbox__content" v-if="checked === true">
			<span
				class="material-symbols-outlined checkbox__symbol"
				v-if="type === 'check-x' || type === 'check-empty'"
			>
				done
			</span>
			<div class="checkbox__dot" v-if="type === 'dot-empty'"></div>
		</div>

		<div class="checkbox__content" v-if="checked === false">
			<span class="material-symbols-outlined checkbox__symbol" v-if="type === 'check-x'">
				close
			</span>
			<div class="checkbox__empty" v-else></div>
		</div>

		<div class="checkbox__content" v-if="checked === null || checked === undefined">
			<div class="checkbox__empty"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.checkbox {
	cursor: pointer;
	width: 18px;
	height: 18px;
	border: 2px solid c.$text;
	border-radius: 50%;

	&__dot {
		cursor: pointer;
		width: 10px;
		height: 10px;
		background-color: c.$text;
		border-radius: 50%;
	}
	&__content {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		position: relative;
		position: relative;
	}
	&__symbol {
		cursor: pointer;
		font-size: 14px;
		width: 14px;
		height: 14px;
	}

	&[disabled='true'] {
		cursor: default;
		pointer-events: none;
		border-color: c.$text-disabled;
	}
}
</style>
