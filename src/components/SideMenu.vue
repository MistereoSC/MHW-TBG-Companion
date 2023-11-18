<script lang="ts" setup>
import {onMounted} from 'vue'

const props = defineProps<{
	message?: string
}>()
const emit = defineEmits([])
onMounted(() => {
	return
})
</script>

<template>
	<div class="menu">
		<img class="menu__image" src="/logo.png" alt="Game Logo" />
		<div class="menu__title"><span class="menu__title__text">Board Game Companion</span></div>
		<nav class="nav">
			<div class="separator"></div>
			<router-link :to="{name: 'campaign'}" class="nav__item" disabled>
				<span class="nav__text"
					><img class="nav__image" src="/icons/icon_campaign.png" />Campaign Tracker</span
				>
			</router-link>
			<router-link :to="{name: 'hunt'}" class="nav__item">
				<span class="nav__text"
					><img class="nav__image" src="/icons/icon_potion.png" />Hunt Helper</span
				>
			</router-link>

			<div class="separator"></div>

			<router-link :to="{name: 'weapons'}" class="nav__item" disabled>
				<span class="nav__text"
					><img class="nav__image" src="/icons/icon_weapon.png" />Weapon Trees</span
				>
			</router-link>
			<router-link :to="{name: 'armors'}" class="nav__item">
				<span class="nav__text"
					><img class="nav__image" src="/icons/icon_armor.png" />Armor Trees</span
				>
			</router-link>
			<router-link :to="{name: 'monsters'}" class="nav__item" disabled>
				<span class="nav__text"
					><img class="nav__image" src="/icons/icon_monster.png" />Monster Info</span
				>
			</router-link>
			<router-link :to="{name: 'quests'}" class="nav__item" disabled>
				<span class="nav__text"
					><img class="nav__image" src="/icons/icon_quest.png" />Quest Log</span
				>
			</router-link>
			<router-link :to="{name: 'arenas'}" class="nav__item" disabled>
				<span class="nav__text"
					><img class="nav__image" src="/icons/icon_arena.png" />Arena Quests</span
				>
			</router-link>

			<div class="separator"></div>

			<router-link :to="{name: 'settings'}" class="nav__item" disabled>
				<span class="nav__text"
					><img class="nav__image" src="/icons/icon_settings.png" />Settings</span
				>
			</router-link>
			<router-link :to="{name: 'about'}" class="nav__item">
				<span class="nav__text"><img class="nav__image" src="/icons/icon_about.png" />About</span>
			</router-link>

			<div class="separator"></div>
		</nav>
	</div>
</template>

<style lang="scss" scoped>
.separator {
	height: 2px;
	background-color: c.$background-3;
	margin: 4px 8px 4px 0;
}
.menu {
	display: flex;
	flex-direction: column;
	background-color: c.$background-00;
	padding-top: 1em;

	&__title {
		user-select: none;
		pointer-events: none;

		margin: 0;
		text-align: center;
		line-height: 1.2;
		margin: 4px 0 12px 0;
		&__text {
			border-top: 2px solid c.$text-mute;
			border-bottom: 2px solid c.$text-mute;
			padding: 0 12px;
			font-size: 14px;
			font-weight: bold;
			user-select: none;
		}
	}
	&__image {
		width: 200px;
		height: 100px;
		user-select: none;
		pointer-events: none;
		margin: 0 10px;
	}
}
.nav {
	display: flex;
	flex-direction: column;
	gap: 4px;

	&__item {
		text-decoration: none;
		width: 100%;
		padding: 0 28px 0 0;
		transition: padding 0.2s ease-out;
		&.router-link-active {
			padding: 0 8px 0 20px;
			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0.15) 0%,
				rgba(255, 255, 255, 0.1) 35%,
				rgba(0, 212, 255, 0) 100%
			);
			.nav__image {
				filter: none;
			}
		}

		&:hover {
			// background-color: c.$background-3;
			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0.15) 0%,
				rgba(255, 255, 255, 0.1) 35%,
				rgba(0, 212, 255, 0) 100%
			);
			.nav__image {
				filter: none;
			}
		}

		&.disabled,
		&[disabled] {
			pointer-events: none;

			.nav__text {
				color: c.$text-disabled;
			}
		}
	}
	&__text {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		font-size: 18px;
		font-weight: bold;
	}
	&__image {
		transition: filter 0.2s ease-out;
		width: 28px;
		height: 28px;
		filter: grayscale(100%);
	}
}
</style>
