<script lang="ts" setup>
import {onMounted} from 'vue'
import BorderComponent from '@/components/BorderComponent.vue'

const props = defineProps<{
	message?: string
}>()
const emit = defineEmits([])
onMounted(() => {
	return
})
</script>

<template>
	<BorderComponent :enable_hover="true"></BorderComponent>
</template>

<style lang="scss" scoped></style>
