<script lang="ts" setup>
import BorderComponent from '@/components/BorderComponent.vue'
</script>

<template>
	<div class="page">
		<BorderComponent :disable_hover="true">
			<div class="about">
				<h1 class="about__title">About</h1>
				<p class="about__text">
					Inofficial companion application for Monster Hunter: World - The Board Game
				</p>
				<p class="about__subtext">©Sebastian Lehmann - 2023</p>
				<div class="separator"></div>
				<div class="about__buttons">
					<a href="https://github.com/MistereoSC" class="about__buttons__link" target="_blank">
						<img src="/icons/brands/github.png" alt="GitHub" class="about__buttons__icon --color" />
					</a>
					<a
						href="https://www.reddit.com/user/mistereo_sc/"
						class="about__buttons__link"
						target="_blank"
					>
						<img src="/icons/brands/reddit.png" alt="GitHub" class="about__buttons__icon" />
					</a>
					<a href="https://ko-fi.com/mistereosc" class="about__buttons__link" target="_blank">
						<img src="/icons/brands/kofi.png" alt="GitHub" class="about__buttons__icon" />
					</a>
				</div>
			</div>
		</BorderComponent>
		<img src="/background.png" class="page__background" />
	</div>
</template>

<style lang="scss" scoped>
.page {
	position: relative;
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	padding: 100px;
	&__background {
		position: absolute;
		inset: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		opacity: 0.6;
	}
}

.about {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 16px;
	background-color: c.$background;

	&__subtext {
		margin-top: 20px;
		color: c.$text-mute;
	}

	&__buttons {
		display: flex;
		gap: 10px;
		&__icon {
			width: 24px;
			height: 24px;
			filter: grayscale(100%);
		}
		&__link {
			&:hover {
				.about__buttons__icon {
					filter: none;
					&.--color {
						filter: invert(12%) sepia(100%) saturate(5418%) hue-rotate(259deg) brightness(85%)
							contrast(133%);
					}
				}
			}
		}
	}
}
.separator {
	width: 100%;
	height: 2px;
	background-color: c.$background-3;
	margin: 4px 8px 12px 8px;
}
</style>
