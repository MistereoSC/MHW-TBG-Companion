<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import BorderComponent from '@/components/BorderComponent.vue'
BorderComponent

const props = defineProps<{
	hide_close_button?: boolean
}>()
const emit = defineEmits<{
	(e: 'close'): void
}>()

const margin = ref(0)
onMounted(() => {
	const menu = document.getElementById('id_menu_side')
	if (!menu) {
		console.error('ERR:: Render | Modal - side menu not found')
		return
	}
	margin.value = menu.getBoundingClientRect().width
})
</script>

<template>
	<div class="modal__blind">
		<div class="modal__wrapper" :style="{'margin-left': margin + 'px'}">
			<BorderComponent class="modal__frame">
				<div class="modal__content" id="id_modal_content">
					<slot></slot>
					<button
						class="modal__close c-button__icon"
						@click="() => emit('close')"
						v-if="!hide_close_button"
					>
						<span class="material-symbols-outlined"> close </span>
					</button>
				</div>
			</BorderComponent>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.modal {
	&__blind {
		z-index: 1000;
		position: fixed;
		inset: 0;
		background-color: rgba($color: c.$background-00, $alpha: 0.8);
	}
	&__wrapper {
		height: 100vh;
		background-color: rgba($color: c.$background-00, $alpha: 0.6);
		box-shadow: 0 0 96px 16px rgba($color: #ffffff, $alpha: 0.1) inset;

		display: grid;
		place-items: center;
	}
	&__frame {
		position: relative;
		opacity: 1;
		background-color: c.$background;
		min-width: 200px;
		min-height: 200px;
	}
	&__close {
		position: absolute;
		top: 8px;
		right: 8px;
	}
}
</style>
