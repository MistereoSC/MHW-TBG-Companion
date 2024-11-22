<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {type IWeaponSet, type IExpansions, EWeapons} from '@/components/interfaces/items'
import WeaponSet from './WeaponSet.vue'
import Greatsword from '@/assets/data/weapons/greatsword.json'
import Gunlance from '@/assets/data/weapons/gunlance.json'
import {useSettingsStore} from '@/stores/settings'
const settingsStore = useSettingsStore()

const PAGE_DIRECTION =
	settingsStore.settingsData?.general.weapon_direction_vertical === false
		? 'horizontal'
		: 'vertical'

const activeWeaponJson = ref(Greatsword as IExpansions<Array<IWeaponSet>>)
onMounted(async () => {
	selectActivePage(props.active_weapon)
	if (PAGE_DIRECTION === 'horizontal') {
		const scrollContainer = document.getElementById('id_armor_sets_scroll_container')
		if (!scrollContainer) {
			console.error('ERR::: Render | Armor Sets - Scroll container non-existent')
			return
		}
		scrollContainer.addEventListener('wheel', (e) => {
			if (!e.ctrlKey) {
				e.preventDefault
				scrollContainer.scrollLeft += e.deltaY
			}
		})
	}
})

const props = defineProps<{
	active_weapon: EWeapons
}>()
watch(
	() => props.active_weapon,
	async (newVal: EWeapons) => {
		await selectActivePage(newVal)
	}
)
async function selectActivePage(type: EWeapons) {
	switch (type) {
		// Ancient Forest
		case EWeapons.Greatsword:
			activeWeaponJson.value = Greatsword
			break
		case EWeapons.SnS:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "SnS" */ '@/assets/data/weapons/sns.json'
			)
			break
		case EWeapons.Dualblades:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "Dualblades" */ '@/assets/data/weapons/dualblades.json'
			)
			break
		case EWeapons.Bow:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "Bow" */ '@/assets/data/weapons/bow.json'
			)
			break
		// Wildspire Waste
		case EWeapons.Gunlance:
			activeWeaponJson.value = Gunlance
			break
		case EWeapons.Chargeblade:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "Chargeblade" */ '@/assets/data/weapons/chargeblade.json'
			)
			break
		case EWeapons.InsectGlaive:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "InsectGlaive" */ '@/assets/data/weapons/glaive.json'
			)
			break
		case EWeapons.HeavyBowgun:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "HeavyBowgun" */ '@/assets/data/weapons/hbg.json'
			)
			break
		// Character Expansion
		case EWeapons.Longsword:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "Longsword" */ '@/assets/data/weapons/longsword.json'
			)
			break
		case EWeapons.Hammer:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "Hammer" */ '@/assets/data/weapons/hammer.json'
			)
			break
		case EWeapons.Lance:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "Lance" */ '@/assets/data/weapons/lance.json'
			)
			break
		case EWeapons.Switchaxe:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "Switchaxe" */ '@/assets/data/weapons/switchaxe.json'
			)
			break
		case EWeapons.HuntingHorn:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "HuntingHorn" */ '@/assets/data/weapons/horn.json'
			)
			break
		case EWeapons.LightBowgun:
			activeWeaponJson.value = await import(
				/* webpackChunkName: "LightBowgun" */ '@/assets/data/weapons/lbg.json'
			)
			break
		default:
			activeWeaponJson.value = Greatsword
			break
	}
}
</script>

<template>
	<div class="page">
		<div
			class="content scrollable"
			:class="{'--vertical': PAGE_DIRECTION == 'vertical'}"
			id="id_armor_sets_scroll_container"
			v-if="activeWeaponJson !== null"
		>
			<div class="set" v-for="set in activeWeaponJson.basic">
				<WeaponSet
					:weapon_class="active_weapon"
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></WeaponSet>
			</div>

			<div
				class="separator"
				v-if="settingsStore.settingsData?.owned_expansions.ancient_forest"
			></div>

			<div
				class="set"
				v-for="set in activeWeaponJson.ancient_forest"
				v-if="settingsStore.settingsData?.owned_expansions.ancient_forest"
			>
				<WeaponSet
					:weapon_class="active_weapon"
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></WeaponSet>
			</div>

			<div
				class="separator"
				v-if="settingsStore.settingsData?.owned_expansions.wildspire_waste"
			></div>
			<div
				class="set"
				v-for="set in activeWeaponJson.wildspire_waste"
				v-if="settingsStore.settingsData?.owned_expansions.wildspire_waste"
			>
				<WeaponSet
					:weapon_class="active_weapon"
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></WeaponSet>
			</div>

			<div class="separator" v-if="settingsStore.ownsNonBaseExpansion()"></div>
			<div
				class="set"
				v-for="set in activeWeaponJson.kulu"
				v-if="settingsStore.settingsData?.owned_expansions.kulu"
			>
				<WeaponSet
					:weapon_class="active_weapon"
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></WeaponSet>
			</div>
			<div
				class="set"
				v-for="set in activeWeaponJson.teostra"
				v-if="settingsStore.settingsData?.owned_expansions.teostra"
			>
				<WeaponSet
					:weapon_class="active_weapon"
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></WeaponSet>
			</div>
			<div
				class="set"
				v-for="set in activeWeaponJson.nergigante"
				v-if="settingsStore.settingsData?.owned_expansions.nergigante"
			>
				<WeaponSet
					:weapon_class="active_weapon"
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></WeaponSet>
			</div>
			<div
				class="set"
				v-for="set in activeWeaponJson.kushala"
				v-if="settingsStore.settingsData?.owned_expansions.kushala"
			>
				<WeaponSet
					:weapon_class="active_weapon"
					:set="set"
					:direction="PAGE_DIRECTION === 'vertical' ? 'horizontal' : 'vertical'"
				></WeaponSet>
			</div>

			<div class="blind --before" v-if="PAGE_DIRECTION == 'horizontal'"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.set {
	margin: auto 0;
}
.page {
	width: 100%;
	height: 100%;
	max-height: calc(100vh - 63px);
}
.blind {
	width: 60px;

	position: absolute;

	&.--after {
		inset: 0 0 8px auto;
		background: linear-gradient(-90deg, rgba(24, 24, 24, 1) 0%, rgba(0, 0, 0, 0) 100%);
	}
	&.--before {
		inset: 0 auto 8px 0;
		background: linear-gradient(90deg, rgba(24, 24, 24, 1) 0%, rgba(0, 0, 0, 0) 100%);
	}
}
.content {
	position: relative;
	width: auto;
	display: flex;
	flex-direction: row;
	padding: 10px 50px 10px 50px;
	gap: 34px;

	overflow: scroll;

	.separator {
		width: 0;
		height: 100%;
		outline: 1px solid c.$background-1;
	}

	&.--vertical {
		flex-direction: column;
		padding: 3rem 0;
		.separator {
			width: 100%;
			height: 12px;
		}
	}
}
</style>
