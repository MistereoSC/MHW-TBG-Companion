<script lang="ts" setup>
import {onMounted} from 'vue'

const props = defineProps<{
	blur_radius?: number
	prevent_clickthrough?: boolean
	disable_hover?: boolean
}>()
const emit = defineEmits([])
onMounted(() => {
	return
})

function getBoxShadow() {
	if (props.blur_radius === 0) return 'none'
	if (props.blur_radius === undefined) return `0 0 50px 10px rgba(0,0,0,0.5) inset`
	const blur = props.blur_radius
	const spread = blur <= 20 ? Math.ceil(blur / 3) : 10
	return `0 0 ${blur}px ${spread}px rgba(0,0,0,0.5) inset`
}
</script>

<template>
	<div class="component" :class="{animate: !disable_hover}">
		<slot></slot>

		<span class="corner"></span>
		<span class="corner"></span>
		<span class="corner"></span>
		<span class="corner"></span>
		<span class="side"></span>
		<span class="side"></span>
		<span class="side"></span>
		<span class="side"></span>
		<span
			class="overlay"
			:style="{boxShadow: getBoxShadow()}"
			:class="{cover: !prevent_clickthrough}"
		></span>
	</div>
</template>

<style lang="scss" scoped>
$border: 2px solid;
.component {
	min-width: 64px;
	min-height: 64px;
	border: $border c.$background-3;
	transition: border 0.2s ease-out;
	position: relative;
	margin: 16px;

	&.animate {
		&:hover {
			border-color: c.$text;
			span {
				&:nth-of-type(5) {
					top: -11px;
				}
				&:nth-of-type(6) {
					border-bottom: $border;
					bottom: -11px;
				}
				&:nth-of-type(7) {
					left: -11px;
				}
				&:nth-of-type(8) {
					border-right: $border;
					right: -11px;
				}
			}
		}
	}
}

.overlay {
	position: absolute;
	inset: 0;

	&.cover {
		user-select: none;
		pointer-events: none;
	}
}
.corner {
	position: absolute;
	width: 16px;
	height: 16px;
	border: $border;
	border-color: inherit;
	&:nth-of-type(1) {
		top: -16px;
		left: -16px;
	}
	&:nth-of-type(2) {
		bottom: -16px;
		left: -16px;
	}
	&:nth-of-type(3) {
		top: -16px;
		right: -16px;
	}
	&:nth-of-type(4) {
		bottom: -16px;
		right: -16px;
	}
}
.side {
	position: absolute;
	border-color: inherit !important;
	transition: inset 0.1s ease-out;
	&:nth-of-type(5) {
		border-top: $border;
		top: -9px;
		left: 6px;
		right: 6px;
		height: 3px;
	}
	&:nth-of-type(6) {
		border-bottom: $border;
		bottom: -9px;
		left: 6px;
		right: 6px;
		height: 3px;
	}
	&:nth-of-type(7) {
		border-left: $border;
		left: -9px;
		top: 6px;
		bottom: 6px;
		width: 3px;
	}
	&:nth-of-type(8) {
		border-right: $border;
		right: -9px;
		top: 6px;
		bottom: 6px;
		width: 3px;
	}
}
</style>
