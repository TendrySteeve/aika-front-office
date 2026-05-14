<script setup lang="ts">
interface Props {
    title: string
    showButton?: boolean
    buttonText?: string
}

withDefaults(defineProps<Props>(), {
    showButton: false,
    buttonText: 'Ajouter',
})

defineEmits<{
    'add-item': []
}>()
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between gap-4 mb-2">
            <div class="flex items-center gap-3">
                <div class="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                <h2 class="text-sm font-black text-slate-800 uppercase tracking-widest">
                    {{ title }}
                </h2>
            </div>
            <button v-if="showButton" type="button" @click="$emit('add-item')"
                class="rounded-2xl bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-600 transition hover:bg-blue-100">
                {{ buttonText }}
            </button>
        </div>
        <slot />
    </div>
</template>
