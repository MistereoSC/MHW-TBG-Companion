<script lang="ts" setup>
import BorderComponent from '@/components/BorderComponent.vue'
import {useHuntHelperStore} from '@/stores/huntHelper'
import Counter from '@/components/Counter.vue'
const huntHelperStore = useHuntHelperStore()
</script>

<template>
	<div class="page">
		<div class="page__top">
			<Counter
				:max_amount="3"
				icon="icon_potion"
				title="Potions"
				v-model="huntHelperStore.countPotions"
			/>
			<Counter
				:max_amount="3"
				icon="icon_quest"
				title="Lives"
				v-model="huntHelperStore.countLives"
			/>
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
</style>
