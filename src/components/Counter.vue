<script lang="ts" setup>
import {ref, watch} from 'vue'
import BorderComponent from './BorderComponent.vue'

const props = defineProps<{
	max_amount: number
	icon: string
	title: string

	modelValue: number
}>()
const emit = defineEmits<{
	(e: 'update:modelValue', new_val: number): void
}>()
watch(
	() => props.modelValue,
	(newVal, oldVal) => {
		sectionCount()
	}
)

const amountRef1 = ref(props.modelValue % 10)
const amountRef10 = ref(Math.floor(props.modelValue / 10))
function increment() {
	if (props.modelValue >= props.max_amount || props.modelValue >= 99) return
	sectionCount()
	emit('update:modelValue', props.modelValue + 1)
}
function decrement() {
	if (props.modelValue <= 0) return
	sectionCount()
	emit('update:modelValue', props.modelValue - 1)
}

function sectionCount() {
	amountRef1.value = props.modelValue % 10
	amountRef10.value = Math.floor(props.modelValue / 10)
}
</script>

<template>
	<BorderComponent>
		<div class="tracker">
			<img class="tracker__image" :src="`/icons/${icon}.png`" />
			<h3 class="tracker__title">{{ title }}</h3>
			<div class="separator--decorative"></div>
			<div class="tracker__counter">
				<button
					class="tracker__button tracker__button--minus"
					@click="decrement"
					:class="{disabled: modelValue <= 0}"
				></button>
				<div class="tracker__scroller__wrapper">
					<div
						class="tracker__scroller"
						:style="{transform: `translateY(-${amountRef10 * 48}px)`}"
						v-if="max_amount >= 10"
					>
						<div class="tracker__scroller__number">0</div>
						<div class="tracker__scroller__number">1</div>
						<div class="tracker__scroller__number">2</div>
						<div class="tracker__scroller__number">3</div>
						<div class="tracker__scroller__number">4</div>
						<div class="tracker__scroller__number">5</div>
						<div class="tracker__scroller__number">6</div>
						<div class="tracker__scroller__number">7</div>
						<div class="tracker__scroller__number">8</div>
						<div class="tracker__scroller__number">9</div>
					</div>

					<div
						class="tracker__scroller"
						:style="{transform: `translateY(-${amountRef1 * 48}px)`}"
						:class="{'--single': max_amount < 10}"
					>
						<div class="tracker__scroller__number">0</div>
						<div class="tracker__scroller__number">1</div>
						<div class="tracker__scroller__number">2</div>
						<div class="tracker__scroller__number">3</div>
						<div class="tracker__scroller__number">4</div>
						<div class="tracker__scroller__number">5</div>
						<div class="tracker__scroller__number">6</div>
						<div class="tracker__scroller__number">7</div>
						<div class="tracker__scroller__number">8</div>
						<div class="tracker__scroller__number">9</div>
					</div>
				</div>
				<button
					class="tracker__button tracker__button--plus"
					@click="increment"
					:class="{disabled: modelValue >= max_amount}"
				></button>
			</div>
		</div>
	</BorderComponent>
</template>

<style lang="scss" scoped>
.tracker {
	min-width: 190px;
	max-width: 190px;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px 0;

	&__image {
		width: 96px;
		height: 96px;
	}
	&__title {
		text-align: center;
		font-size: 24px;
	}
	&__counter {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		padding: 0 10px;

		font-size: 32px;
		line-height: 1.1;
	}
	&__button {
		width: 32px;
		height: 32px;
		background: transparent;
		border: none;
		position: relative;
		border-color: c.$text;
		cursor: pointer;
		transition: border-color 0.2s ease-out;

		&.disabled {
			border-color: c.$text-disabled;
			cursor: default;
		}

		&--plus {
			&::after {
				content: '';
				position: absolute;
				inset: 14px 3px auto 3px;
				border-bottom: 5px solid;
				border-color: inherit;
				width: 26px;
				height: 2px;
			}
			&::before {
				content: '';
				position: absolute;
				inset: 3px auto 3px 14px;
				border-left: 5px solid;
				border-color: inherit;
				width: 2px;
				height: 26px;
			}
		}
		&--minus {
			&::after {
				content: '';
				position: absolute;
				inset: 14px 3px auto 3px;
				border-bottom: 5px solid;
				border-color: inherit;
				width: 26px;
				height: 2px;
			}
		}
	}
	&__scroller {
		&__wrapper {
			display: flex;
			position: relative;
			border-left: 2px solid c.$background-00;
			border-right: 2px solid c.$background-00;
			overflow-y: hidden;
			background: linear-gradient(
				0deg,
				rgba(0, 0, 0, 0.5) 0%,
				rgba(0, 0, 0, 0.1) 20%,
				rgba(0, 0, 0, 0.1) 80%,
				rgba(0, 0, 0, 0.5) 100%
			);
		}
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 48px;
		width: 28px;

		transition: transform 0.3s ease-in-out;
		transform: translateY(-64px);

		&__number {
			height: 32px;
			margin: 8px 0;
			width: 28px;
			display: grid;
			place-items: center;
			user-select: none;
		}

		&.--single {
			width: 48px;
		}
	}
}

.separator--decorative {
	width: 180px;
	height: 1px;
	border-bottom: 2px solid c.$background-2;
	margin: 5px 5px 10px 5px;
}
</style>
