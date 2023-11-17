<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import BorderComponent from '@/components/BorderComponent.vue'

const props = defineProps<{
	message?: string
}>()
const emit = defineEmits([])
onMounted(() => {
	return
})

const activeNumberPotions = ref(3)
const activeNumberLives = ref(3)
function increasePotion() {
	if (activeNumberPotions.value >= 3) return
	activeNumberPotions.value++
}
function decreasePotion() {
	if (activeNumberPotions.value <= 0) return
	activeNumberPotions.value--
}
function increaseLive() {
	if (activeNumberLives.value >= 3) return
	activeNumberLives.value++
}
function decreaseLive() {
	if (activeNumberLives.value <= 0) return
	activeNumberLives.value--
}
</script>

<template>
	<div class="page">
		<div class="page__top">
			<BorderComponent :disable_hover="true">
				<div class="tracker">
					<img class="tracker__image" src="/icons/icon_potion.png" />
					<h3 class="tracker__title">Potions</h3>
					<div class="separator--decorative"></div>
					<div class="tracker__counter">
						<button
							class="tracker__button tracker__button--minus"
							@click="decreasePotion"
							:class="{disabled: activeNumberPotions <= 0}"
						></button>
						<div class="tracker__scroller__wrapper">
							<div
								class="tracker__scroller"
								:style="{transform: `translateY(-${activeNumberPotions * 48}px)`}"
							>
								<div class="tracker__scroller__number">0</div>
								<div class="tracker__scroller__number">1</div>
								<div class="tracker__scroller__number">2</div>
								<div class="tracker__scroller__number">3</div>
							</div>
						</div>
						<button
							class="tracker__button tracker__button--plus"
							@click="increasePotion"
							:class="{disabled: activeNumberPotions >= 3}"
						></button>
					</div>
				</div>
			</BorderComponent>
			<BorderComponent :disable_hover="true">
				<div class="tracker">
					<img class="tracker__image" src="/icons/icon_quest.png" />
					<h3 class="tracker__title">Lives</h3>
					<div class="separator"></div>
					<div class="tracker__counter">
						<button
							class="tracker__button tracker__button--minus"
							@click="decreaseLive"
							:class="{disabled: activeNumberLives <= 0}"
						></button>
						<div class="tracker__scroller__wrapper">
							<div
								class="tracker__scroller"
								:style="{transform: `translateY(-${activeNumberLives * 48}px)`}"
							>
								<div class="tracker__scroller__number">0</div>
								<div class="tracker__scroller__number">1</div>
								<div class="tracker__scroller__number">2</div>
								<div class="tracker__scroller__number">3</div>
							</div>
						</div>
						<button
							class="tracker__button tracker__button--plus"
							@click="increaseLive"
							:class="{disabled: activeNumberLives >= 3}"
						></button>
					</div>
				</div>
			</BorderComponent>
		</div>
		<div class="page__bottom">
			<div class="separator"></div>
			<h2 class="info__title">Status Effects</h2>
			<div class="info">
				<div class="info__container">
					<h3 class="info__subtitle">Against Hunters</h3>
					<div class="info__content">
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/stun.png" class="info__item__image" />Stun</span
							>
							<span class="info__item__text">
								Choose one attack card from your hand and place it face down on your stamina board.
								If you can't place a card on your stamina board, this status ailment has no effect.
							</span>
						</div>
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/poison.png" class="info__item__image" />Poison</span
							>
							<span class="info__item__text">
								Your hunter loses 2 health at the end of your next turn.
							</span>
						</div>
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/sleep.png" class="info__item__image" />Sleep</span
							>
							<span class="info__item__text">
								You can't place attack cards on your stamina board to attack, move, or dodge until
								the end of your next turn.
							</span>
						</div>
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/paralysis.png" class="info__item__image" />Paralysis</span
							>
							<span class="info__item__text">
								If you have more than 2 cards in your hand, discard down to 2 cards
							</span>
						</div>
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/blight.png" class="info__item__image" />Blastblight</span
							>
							<span class="info__item__text">
								Your hunter has -2 armour until the end of your next turn.
							</span>
						</div>
					</div>
				</div>
				<div class="separator--vertical"></div>
				<div class="info__container">
					<h3 class="info__subtitle">Against Monsters</h3>
					<div class="info__content">
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/stun.png" class="info__item__image" />Stun</span
							>
							<span class="info__item__text">
								The dodge value of the monster's next attack is 1 and can't be increased or
								decreased by any other effect.
							</span>
						</div>
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/poison.png" class="info__item__image" />Poison</span
							>
							<span class="info__item__text">
								The monster loses 2 health at the end of its next turn.
							</span>
						</div>
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/sleep.png" class="info__item__image" />Sleep</span
							>
							<span class="info__item__text">
								Only resolve the hunter turn and hunter attack symbols of the next monster
								behaviour.
							</span>
						</div>
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/paralysis.png" class="info__item__image" />Paralysis</span
							>
							<span class="info__item__text">
								If the monster's next behaviour card has a movement symbol, reduce the number in the
								movement symbol to 0.
							</span>
						</div>
						<div class="info__item">
							<span class="info__item__title"
								><img src="/icons/status/blight.png" class="info__item__image" />Blastblight</span
							>
							<span class="info__item__text">
								Each part of the monster has –1 armour until the end of its next turn,
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	width: 100%;
	display: grid;
	grid-template-rows: 3fr 5fr;
	&__top {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 160px;
	}
	&__bottom {
		background-color: c.$background-0;
		border-top: 2px solid c.$background-2;

		display: flex;
		flex-direction: column;
	}
}

.info {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	&__title {
		width: 100%;
		text-align: center;
		font-size: 32px;
	}
	&__subtitle {
		font-size: 22px;
		align-self: center;
		justify-self: flex-start;
	}
	&__container {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin: 0 20px 40px 20px;
	}
	&__content {
		height: 100%;
		max-width: 385px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 22px;
	}
	&__item {
		display: flex;
		flex-direction: column;
		&__image {
			width: 26px;
			height: 26px;
		}
		&__title {
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 18px;
		}
		&__text {
			font-size: 14px;
		}
	}
}

.tracker {
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
		width: 48px;

		transition: transform 0.3s ease-in-out;
		transform: translateY(-64px);

		&__number {
			height: 32px;
			margin: 8px 0;
			width: 48px;
			display: grid;
			place-items: center;
			user-select: none;
		}
	}
}

.separator {
	width: auto;
	height: 1px;
	border-bottom: 2px solid c.$background-2;
	margin: 4px 16px;
}
.separator--vertical {
	width: 1px;
	height: auto;
	border-left: 2px solid c.$background-2;
	margin: 16px 4px;
}
.separator--decorative {
	width: 180px;
	height: 1px;
	border-bottom: 2px solid c.$background-2;
	margin: 5px 5px 10px 5px;
}
</style>
