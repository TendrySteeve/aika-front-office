<script setup lang="ts">
type ButtonType = 'button' | 'submit' | 'reset'

withDefaults(
    defineProps<{
        btnClass?: string
        btnType?: ButtonType
        disabled?: boolean
    }>(),
    {
        btnClass: '',
        btnType: 'submit',
        disabled: false,
    }
)

const emits = defineEmits<{
    onClick: [value: boolean]
}>()
</script>

<template>
    <button :type="btnType" class="text-sm px-6 py-4 m-4 rounded-lg font-semibold transition-all duration-150 cursor-pointer"
        :class="[btnClass, disabled ? 'opacity-60 cursor-not-allowed' : '']" :disabled="disabled"
        @click="emits('onClick', true)">
        <slot />
    </button>
</template>
