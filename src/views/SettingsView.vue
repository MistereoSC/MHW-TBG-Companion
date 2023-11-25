<script lang="ts" setup>
import BorderComponent from '@/components/BorderComponent.vue'
import Checkbox from '@/components/Checkbox.vue'
import {ref} from 'vue'
import {useSettingsStore} from '@/stores/settings'
import {EExpansions} from '@/components/interfaces/settings'
const settingsStore = useSettingsStore()

function toggleExpansion(exp: EExpansions) {
	settingsStore.toggleExpansion(exp)
}
</script>

<template>
	<div class="settings">
		<div class="settings__header">
			<h1 class="settings__header__title">Settings</h1>
		</div>
		<div class="separator"></div>
		<div class="settings__section">
			<h1 class="settings__subtitle">Owned Expansions</h1>
			<div class="expansions">
				<BorderComponent
					:enable_hover="true"
					@click="() => toggleExpansion(EExpansions.ancient_forest)"
				>
					<div
						class="expansions__content"
						:active="settingsStore.settingsData?.owned_expansions.ancient_forest"
					>
						<img class="expansions__icon" src="/icons/monsters/rathalos.png" />
						<div class="expansions__title">Ancient Forest</div>
					</div>
				</BorderComponent>
				<BorderComponent
					:enable_hover="true"
					@click="() => toggleExpansion(EExpansions.wildspire_waste)"
				>
					<div
						class="expansions__content"
						:active="settingsStore.settingsData?.owned_expansions.wildspire_waste"
					>
						<img class="expansions__icon" src="/icons/monsters/diablos.png" />
						<div class="expansions__title">Wildspire Waste</div>
					</div>
				</BorderComponent>
				<BorderComponent :enable_hover="true" @click="() => toggleExpansion(EExpansions.kulu)">
					<div
						class="expansions__content"
						:active="settingsStore.settingsData?.owned_expansions.kulu"
					>
						<img class="expansions__icon" src="/icons/monsters/kulu.png" />
						<div class="expansions__title">Kulu-Ya-Ku</div>
					</div>
				</BorderComponent>
				<BorderComponent :enable_hover="true" @click="() => toggleExpansion(EExpansions.teostra)">
					<div
						class="expansions__content"
						:active="settingsStore.settingsData?.owned_expansions.teostra"
					>
						<img class="expansions__icon" src="/icons/monsters/teostra.png" />
						<div class="expansions__title">Teostra</div>
					</div>
				</BorderComponent>
				<BorderComponent
					:enable_hover="true"
					@click="() => toggleExpansion(EExpansions.nergigante)"
				>
					<div
						class="expansions__content"
						:active="settingsStore.settingsData?.owned_expansions.nergigante"
					>
						<img class="expansions__icon" src="/icons/monsters/nergigante.png" />
						<div class="expansions__title">Nergigante</div>
					</div>
				</BorderComponent>
				<BorderComponent :enable_hover="true" @click="() => toggleExpansion(EExpansions.kushala)">
					<div
						class="expansions__content"
						:active="settingsStore.settingsData?.owned_expansions.kushala"
					>
						<img class="expansions__icon" src="/icons/monsters/kushala.png" />
						<div class="expansions__title">Kushala Daora</div>
					</div>
				</BorderComponent>
				<BorderComponent
					:enable_hover="true"
					@click="() => toggleExpansion(EExpansions.hunters_arsenal)"
				>
					<div
						class="expansions__content"
						:active="settingsStore.settingsData?.owned_expansions.hunters_arsenal"
					>
						<img class="expansions__icon" src="/icons/weapons/longsword_4.png" />
						<div class="expansions__title">Hunter's Arsenal</div>
					</div>
				</BorderComponent>
			</div>
		</div>
		<div class="separator"></div>
		<div class="settings__section">
			<h1 class="settings__subtitle">General Settings</h1>
			<div class="general">
				<div class="general__section">
					<span class="general__title">Weapon Tree Direction: </span>
					<div class="general__section__element">
						<div class="general__subsection">
							<span class="general__label">Vertical</span>
							<Checkbox
								:checked="settingsStore.settingsData?.general.weapon_direction_vertical"
								type="check-empty"
								@click="() => settingsStore.general.toggleWeaponDirection(true)"
							/>
						</div>
						<div class="general__subsection">
							<span class="general__label">Horizontal</span>
							<Checkbox
								:checked="!settingsStore.settingsData?.general.weapon_direction_vertical"
								type="check-empty"
								@click="() => settingsStore.general.toggleWeaponDirection(false)"
							/>
						</div>
					</div>
				</div>
				<div class="general__section">
					<span class="general__title">Armor Tree Direction: </span>
					<div class="general__section__element">
						<div class="general__subsection">
							<span class="general__label">Vertical</span>
							<Checkbox
								:checked="settingsStore.settingsData?.general.armor_direction_vertical"
								type="check-empty"
								@click="() => settingsStore.general.toggleArmorDirection(true)"
							/>
						</div>
						<div class="general__subsection">
							<span class="general__label">Horizontal</span>
							<Checkbox
								:checked="!settingsStore.settingsData?.general.armor_direction_vertical"
								type="check-empty"
								@click="() => settingsStore.general.toggleArmorDirection(false)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="separator"></div>
	</div>
</template>

<style lang="scss" scoped>
.settings {
	padding: 2em 0;
	&__header {
		padding-bottom: 1em;
		width: 100%;
		display: flex;
		justify-content: center;
		&__title {
			font-size: 2rem;
			padding: 0 1rem;
			border-top: 2px solid c.$text;
			border-bottom: 2px solid c.$text;
		}
	}
	&__section {
		padding: 1em 1em;
	}
}

.expansions {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 1em;

	justify-content: flex-start;

	&__content {
		width: 128px;
		height: 128px;
		position: relative;

		display: flex;
		flex-direction: column;
		justify-content: center;

		&[active='true'] {
			.expansions__icon {
				opacity: 1;
			}
		}
	}
	&__title {
		width: 100%;
		font-size: 1.25rem;
		text-align: center;
		background-color: rgba($color: c.$background-00, $alpha: 0.8);
	}
	&__icon {
		position: absolute;
		inset: 8px;
		width: 114px;
		height: 114px;

		opacity: 0.1;
	}
}
.general {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	&__section {
		display: flex;
		flex-direction: column;
		padding-left: 1em;
		&__element {
			display: flex;
			justify-content: space-between;
			width: 180px;
		}
	}
	&__subsection {
		display: flex;
		gap: 5px;
	}
	&__label {
		display: block;
		font-size: 0.8rem;
	}
}

.separator {
	width: 100%;
	height: 2px;
	background-color: c.$background-3;
}
</style>
