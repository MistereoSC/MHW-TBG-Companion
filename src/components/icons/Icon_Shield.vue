<script lang="ts" setup>
import {defineProps} from 'vue'

const props = defineProps({
	strokeWidth: {
		type: Number,
		required: false,
		default: () => 1,
	},
	stroke: {
		type: String,
		required: false,
		default: () => '#414141',
	},
	fill: {
		type: String,
		required: false,
		default: () => 'none',
	},
})

function getStyle() {
	const out = `
        stroke: ${props.stroke};
		stroke-width: ${props.strokeWidth * 8};
		stroke-dasharray: none;
		stroke-linecap: butt;
		stroke-dashoffset: 0;
		stroke-linejoin: miter;
		stroke-miterlimit: 4;
		fill: ${props.fill};
		fill-rule: nonzero;
		opacity: 1;
    `
	return out
}
</script>

<template>
	<div>
		<div class="svg-container">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				version="1.1"
				viewBox="0 0 256 256"
				xml:space="preserve"
			>
				<g
					transform="matrix(1.3829209653 0 0 1.3816282137 129.1019933602 128)"
					id="nt8COe88TW3SEOHkA5B8M"
				>
					<path
						:style="getStyle()"
						transform=" translate(-72, -88)"
						d="M 96 176 L 48 176 L 0 128 L 0 0 L 144 0 L 144 128 z"
						stroke-linecap="round"
					/>
				</g>
			</svg>
			<div class="svg-content"><slot></slot></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
svg {
	width: 90%;
	height: 90%;
}
.svg-container {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	align-items: flex-end;
	justify-content: center;
}
.svg-content {
	position: absolute;
	inset: auto 0 0 0;
	width: 100%;
	height: 95%;
	display: grid;
	place-items: center;
}
</style>
