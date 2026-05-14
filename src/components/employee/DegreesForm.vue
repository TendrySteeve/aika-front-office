<script setup lang="ts">
import type { Degree } from '@/types/Employee';
import FormInput from './FormInput.vue'
import FormSection from './FormSection.vue'

const forms = defineModel<Degree[]>({ required: true })

const emit = defineEmits<{
    'add-degree': []
    'remove-degree': [index: number]
}>()

const addDegree = () => {
    emit('add-degree')
}

const removeDegree = (index: number) => {
    emit('remove-degree', index)
}
</script>

<template>
    <FormSection title="Diplômes obtenues" show-button button-text="Ajouter un diplôme" @add-item="addDegree">
        <div v-for="(degree, index) in forms" :key="`degree-${degree.id ?? index}`"
            class="space-y-6 rounded-4xl border border-slate-100 bg-slate-50/60 p-6">
            <div class="flex items-center justify-between gap-4">
                <p class="text-xs font-black uppercase tracking-widest text-slate-500">
                    Diplôme {{ index + 1 }}
                </p>
                <button type="button" @click="removeDegree(index)" :disabled="forms.length === 1"
                    class="rounded-2xl bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
                    Supprimer
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormInput v-model="degree.degree_name"
                     label="Nom du diplôme"
                    placeholder="Nom du diplôme" bg-color="bg-white" />
                <div class="md:col-span-2">
                    <FormInput v-model="degree.institution"
                        label="Institution"
                        placeholder="Institution" bg-color="bg-white" />
                </div>
                <FormInput v-model="degree.graduation_year"
                     label="Année d'obtention"
                    placeholder="AAAA" :maxlength="4" bg-color="bg-white" />
            </div>
        </div>
    </FormSection>
</template>
