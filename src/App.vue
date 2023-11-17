<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import SideMenu from '@/components/SideMenu.vue'
</script>

<template>
	<div class="page">
		<header class="page__header"></header>
		<main class="page__content">
			<SideMenu class="page__menu"></SideMenu>
			<RouterView />
		</main>
	</div>
</template>

<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-rows: auto 1fr;

	&__content {
		display: grid;
		grid-template-columns: auto 1fr;
	}

	&__header {
	}
	&__menu {
	}
}
</style>
<style lang="scss">
@import '@/assets/styles/global.scss';
</style>
