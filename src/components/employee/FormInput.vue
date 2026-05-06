<script setup lang="ts">
const model = defineModel<string | number>()

withDefaults(
    defineProps<{
        label: string
        placeholder?: string
        type?: 'text' | 'email' | 'number' | 'date' | 'password' | 'phone'
        maxlength?: number
        required?: boolean
        colSpan?: number
        bgColor?: string
    }>(),
    {
        placeholder: '',
        type: 'text',
        required: false,
        colSpan: 1,
        bgColor: 'bg-slate-50',
    }
)
</script>

<template>
    <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-2">
            {{ label }}
        </label>

        <input v-model="model" :type="type" :placeholder="placeholder" :maxlength="maxlength" :required="required"
            :class="[
                'w-full border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 transition-all outline-none placeholder:text-slate-300',
                bgColor === 'bg-slate-50' ? 'bg-slate-50 focus:bg-white' : bgColor]" />
    </div>
</template>