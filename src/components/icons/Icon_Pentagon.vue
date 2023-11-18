<script lang="ts" setup>
const props = defineProps({
	strokeWidth: {
		type: Number,
		required: false,
		default: () => 2,
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
		stroke-width: ${props.strokeWidth * 4};
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
	<div class="svg-container">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			viewBox="0 0 256 256"
			xml:space="preserve"
		>
			<g
				transform="matrix(2.8390424667 0 0 2.8390424667 128 129.449603624)"
				id="vGAii8JGfYHBW5IKbMcKe"
			>
				<path
					:style="getStyle()"
					transform=" translate(-40, -40)"
					d="M 0 30.56 L 40 0 L 80 30.56 L 64.72 80 L 15.28 80 L 0 30.56 z"
					stroke-linecap="round"
				/>
			</g>
		</svg>
		<div class="svg-content"><slot></slot></div>
	</div>
</template>

<style lang="scss" scoped>
svg {
	width: 100%;
	height: 100%;
}
.svg-container {
	position: relative;
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
