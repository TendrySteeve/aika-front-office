<script setup lang="ts">
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormTextarea from './FormTextarea.vue'
import FormSection from './FormSection.vue'
import { getLevelSkillLabel } from '@/utils/choicesLabel'
import { LEVEL_CHOICES } from '@/enums/choices'
import type { Skill } from '@/types/Employee'

const forms = defineModel<Skill[]>({ required: true })

const emit = defineEmits<{
    'add-skill': []
    'remove-skill': [id: number]
}>()

const addSkill = () => {
    emit('add-skill')
}

const removeSkill = (id: number) => {
    emit('remove-skill', id)
}
</script>

<template>
    <FormSection title="Compétences" show-button button-text="Ajouter une compétence" @add-item="addSkill">
        <div v-for="(skill) in forms" :key="`skill-${skill.id}`"
            class="space-y-6 rounded-4xl border border-slate-100 bg-slate-50/60 p-6">
            <div class="flex items-center justify-between gap-4">
                <p class="text-xs font-black uppercase tracking-widest text-slate-500">
                    Compétence {{ skill.id as number + 1 }}
                </p>
                <button type="button" @click="removeSkill(skill.id as number)" :disabled="forms.length === 1"
                    class="rounded-2xl bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
                    Supprimer
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput v-model="skill.skill_name" label="Nom de la compétence" placeholder="Nom de la compétence"
                    bg-color="bg-white" />
                <FormSelect v-model="skill.level" label="Niveau" :options="LEVEL_CHOICES"
                    :get-label="getLevelSkillLabel" bg-color="bg-white" />
                <div class="md:col-span-2">
                    <FormTextarea v-model="skill.description" label="Description"
                        placeholder="Description de la compétence" :rows="6" bg-color="bg-white" />
                </div>
            </div>
        </div>
    </FormSection>
</template>
