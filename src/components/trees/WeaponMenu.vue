<script lang="ts" setup>
import {ref} from 'vue'
import {EWeapons} from '@/components/interfaces/items'
import {useSettingsStore} from '@/stores/settings'
const settingsStore = useSettingsStore()

const emit = defineEmits<{
	(e: 'select', value: number): void
}>()
const props = defineProps<{
	active_weapon: EWeapons
}>()

function selectWeapon(value: EWeapons) {
	emit('select', value)
}

const ICON_COLOR_1 = 1
const ICON_COLOR_2 = 2
const ICON_COLOR_3 = 4
</script>

<template>
	<nav class="menu">
		<div class="menu__section" v-if="settingsStore.settingsData?.owned_expansions.ancient_forest">
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Greatsword"
				@click="() => selectWeapon(EWeapons.Greatsword)"
			>
				<img
					:src="`/icons/weapons/greatsword_${ICON_COLOR_1}.png`"
					alt="Greatsword"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.SnS"
				@click="() => selectWeapon(EWeapons.SnS)"
			>
				<img
					:src="`/icons/weapons/sns_${ICON_COLOR_1}.png`"
					alt="Sword and Shield"
					class="menu__item__image"
				/>
			</button>

			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Dualblades"
				@click="() => selectWeapon(EWeapons.Dualblades)"
			>
				<img
					:src="`/icons/weapons/dualblades_${ICON_COLOR_1}.png`"
					alt="Dualblades"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Bow"
				@click="() => selectWeapon(EWeapons.Bow)"
			>
				<img :src="`/icons/weapons/bow_${ICON_COLOR_1}.png`" alt="Bow" class="menu__item__image" />
			</button>
		</div>
		<div
			class="separator--menu"
			v-if="
				settingsStore.settingsData?.owned_expansions.wildspire_waste &&
				settingsStore.settingsData?.owned_expansions.ancient_forest
			"
		></div>
		<div class="menu__section" v-if="settingsStore.settingsData?.owned_expansions.wildspire_waste">
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Gunlance"
				@click="() => selectWeapon(EWeapons.Gunlance)"
			>
				<img
					:src="`/icons/weapons/gunlance_${ICON_COLOR_2}.png`"
					alt="Gunlance"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Chargeblade"
				@click="() => selectWeapon(EWeapons.Chargeblade)"
			>
				<img
					:src="`/icons/weapons/chargeblade_${ICON_COLOR_2}.png`"
					alt="Chargeblade"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.InsectGlaive"
				@click="() => selectWeapon(EWeapons.InsectGlaive)"
			>
				<img
					:src="`/icons/weapons/glaive_${ICON_COLOR_2}.png`"
					alt="Insect Glaive"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.HeavyBowgun"
				@click="() => selectWeapon(EWeapons.HeavyBowgun)"
			>
				<img
					:src="`/icons/weapons/hbg_${ICON_COLOR_2}.png`"
					alt="Heavy Bowgun"
					class="menu__item__image"
				/>
			</button>
		</div>
		<div
			class="separator--menu"
			v-if="settingsStore.settingsData?.owned_expansions.hunters_arsenal"
		></div>
		<div class="menu__section" v-if="settingsStore.settingsData?.owned_expansions.hunters_arsenal">
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Longsword"
				@click="() => selectWeapon(EWeapons.Longsword)"
			>
				<img
					:src="`/icons/weapons/longsword_${ICON_COLOR_3}.png`"
					alt="Longsword"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Hammer"
				@click="() => selectWeapon(EWeapons.Hammer)"
			>
				<img
					:src="`/icons/weapons/hammer_${ICON_COLOR_3}.png`"
					alt="Hammer"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Lance"
				@click="() => selectWeapon(EWeapons.Lance)"
			>
				<img
					:src="`/icons/weapons/lance_${ICON_COLOR_3}.png`"
					alt="Lance"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.Switchaxe"
				@click="() => selectWeapon(EWeapons.Switchaxe)"
			>
				<img
					:src="`/icons/weapons/switchaxe_${ICON_COLOR_3}.png`"
					alt="Switchaxe"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.HuntingHorn"
				@click="() => selectWeapon(EWeapons.HuntingHorn)"
			>
				<img
					:src="`/icons/weapons/horn_${ICON_COLOR_3}.png`"
					alt="HuntingHorn"
					class="menu__item__image"
				/>
			</button>
			<button
				class="menu__item"
				:active="active_weapon == EWeapons.LightBowgun"
				@click="() => selectWeapon(EWeapons.LightBowgun)"
			>
				<img
					:src="`/icons/weapons/lbg_${ICON_COLOR_3}.png`"
					alt="Light Bowgun"
					class="menu__item__image"
				/>
			</button>
		</div>
	</nav>
</template>

<style lang="scss" scoped>
.menu {
	width: 100%;
	background-color: c.$background-00;
	display: flex;
	justify-content: center;
	&__section {
		display: flex;
	}
	&__item {
		padding: 4px;
		&__image {
			width: 52px;
			height: 52px;

			filter: grayscale(100%);
			transition: filter 0.1s ease-out;
		}

		&[active='true'],
		&:hover {
			.menu__item__image {
				filter: grayscale(0%);
			}
		}
		&[active='true'] {
			background: linear-gradient(
				0deg,
				c.$accent-green 0%,
				c.$accent-green 5%,
				rgba(255, 255, 255, 0.2) 5%,
				rgba(0, 0, 0, 1) 100%
			);
		}
	}
}

.separator--menu {
	width: 2px;
	background-color: c.$background-3;
	margin: 4px 12px;
}
</style>
