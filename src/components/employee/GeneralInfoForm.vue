<script setup lang="ts">
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormSection from './FormSection.vue'
import { getSexLabel, getMaritalStatusLabel } from '@/utils/choicesLabel'
import { SEX_CHOICES, MARITAL_STATUS_CHOICES } from '@/enums/choices'
import type { Employee } from '@/types/Employee'

const form = defineModel<Employee>({required: true})

</script>

<template>
    <FormSection title="Informations Générales">
        <div class="grid grid-cols-1 md:grid-cols-7 gap-6">
            <FormInput v-model="form.matricule"
                label="Matricule" placeholder="Matricule" required />
            <FormInput v-model="form.user"
                label="Utilisateur" placeholder="UUID" />
            <div class="md:col-span-2">
                <FormInput v-model="form.last_name"
                    label="Nom de famille" placeholder="Le nom" required />
            </div>
            <div class="md:col-span-3">
                <FormInput v-model="form.first_name"
                    label="Prénom(s)" placeholder="Le prénom" required />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FormInput v-model="form.birth_date"
                label="Date de naissance" type="date" required />
            <div class="md:col-span-2">
                <FormInput v-model="form.birth_place"
                    label="Lieu de naissance"
                    placeholder="Lieu de naissance" required />
            </div>
            <FormSelect v-model="form.sex" label="Sexe"
                :options="SEX_CHOICES" :get-label="getSexLabel" required />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput v-model="form.nationality"
                label="Nationalité" placeholder="Nationalité" required />
            <FormSelect v-model="form.marital_status"
                label="Situation matrimonial"
                :options="MARITAL_STATUS_CHOICES" :get-label="getMaritalStatusLabel" required />
            <FormInput v-model="form.child_count"
                label="Nombre d'enfants" placeholder="Nombre d'enfant" type="number" />
        </div>
    </FormSection>
</template>
