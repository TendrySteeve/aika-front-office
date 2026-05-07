<script setup lang="ts">
import type { Education } from '@/types/Employee';
import FormInput from './FormInput.vue'
import FormSection from './FormSection.vue'

const forms = defineModel<Education[]>({ required: true })

const emit = defineEmits<{
    'add-education': []
    'remove-education': [index: number]
}>()

const addEducation = () => {
    emit('add-education')
}

const removeEducation = (index: number) => {
    emit('remove-education', index)
}
</script>

<template>
    <FormSection title="Parcours pédagogique" show-button button-text="Ajouter un parcours" @add-item="addEducation">
        <div v-for="(education, index) in forms" :key="`education-${education.id ?? index}`"
            class="space-y-6 rounded-4xl border border-slate-100 bg-slate-50/60 p-6">
            <div class="flex items-center justify-between gap-4">
                <p class="text-xs font-black uppercase tracking-widest text-slate-500">
                    Parcours {{ index + 1 }}
                </p>
                <button type="button" @click="removeEducation(index)" :disabled="forms.length === 1"
                    class="rounded-2xl bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
                    Supprimer
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput v-model="education.level" 
                    label="Niveau d'étude" placeholder="Niveau d'étude" bg-color="bg-white" />
                <div class="md:col-span-2">
                    <FormInput v-model="education.institution"
                        label="Institution"
                        placeholder="Institution" bg-color="bg-white" />
                </div>
            </div>
        </div>
    </FormSection>
</template>
