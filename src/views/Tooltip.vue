<script lang="ts" setup>
const props = defineProps<{
	message?: string
	position?: 'top' | 'bottom' | 'left' | 'right'
}>()
</script>

<template>
	<div
		class="tooltip__container"
		:class="{
			'--left': props.position === 'left',
			'--right': props.position === 'right',
			'--top': props.position === 'top' || props.position === undefined,
			'--bottom': props.position === 'bottom',
		}"
	>
		<slot></slot>
		<span v-if="props.message" v-html="props.message"></span>
	</div>
</template>

<style lang="scss" scoped>
.tooltip__container {
	position: absolute;
	pointer-events: none;
	user-select: none;
	background-color: c.$background-00;
	padding: 6px;
	border-radius: 3px;
	z-index: 100;

	&::before {
		content: '';
		position: absolute;
		width: 12px;
		height: 12px;
		background-color: c.$background-00;
		transform: rotate(45deg);
	}

	&.--top {
		bottom: 110%;
		&::before {
			bottom: -6px;
			right: calc(50% - 6px);
		}
	}
	&.--bottom {
		top: 110%;
		&::before {
			top: -6px;
			right: calc(50% - 6px);
		}
	}
	&.--left {
		right: 110%;
		&::before {
			right: -6px;
			top: calc(50% - 6px);
		}
	}
	&.--right {
		left: 110%;
		&::before {
			left: -6px;
			top: calc(50% - 6px);
		}
	}
}
</style>
