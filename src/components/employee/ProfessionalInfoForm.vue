<script setup lang="ts">
import type { Professional } from '@/types/Employee';
import FormInput from './FormInput.vue'
import FormSection from './FormSection.vue'

const form = defineModel<Professional>({required: true})

</script>

<template>
    <FormSection title="Informations professionelles">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput v-model="form.departement"
                label="Département" placeholder="Département" />
            <FormInput v-model="form.job_title"
                label="Titre du poste" placeholder="Titre du poste" />
            <FormInput v-model="form.superior"
                label="Supérieur hiérarchique" placeholder="Supérieur hiérarchique" />
        </div>
    </FormSection>
</template>
