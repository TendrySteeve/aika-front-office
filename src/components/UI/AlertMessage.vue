<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/vue/16/solid'

type AlertType = 'success' | 'error' | 'warning'

const props = withDefaults(
    defineProps<{
        type?: AlertType
        message?: string
    }>(),
    {
        type: 'success',
        message: '',
    }
)

const isError = computed(() => props.type === 'error')
const isWarning = computed(() => props.type === 'warning')
const iconComponent = computed(() => {
    if (isError.value) return XCircleIcon
    if (isWarning.value) return ExclamationTriangleIcon
    return CheckCircleIcon
})
const containerClass = computed(() => {
    if (isError.value) return 'bg-red-50 border-l-4 border-red-500 text-red-700'
    if (isWarning.value) return 'bg-amber-50 border-l-4 border-amber-500 text-amber-700'
    return 'bg-green-50 border-l-4 border-green-500 text-green-700'
})
</script>

<template>
    <transition name="fade">
        <div v-if="message" :class="[containerClass, 'px-4 py-3 rounded mb-4 flex items-start gap-3']">
            <component :is="iconComponent" class="w-4 h-4" />
            <span class="text-xs">{{ message }}</span>
        </div>
    </transition>
</template>
