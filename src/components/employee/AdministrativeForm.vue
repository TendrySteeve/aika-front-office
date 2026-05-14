<script setup lang="ts">
import type { Administrative } from '@/types/Employee';
import FormInput from './FormInput.vue'
import FormSection from './FormSection.vue'

const form = defineModel<Administrative>({ required: true })
</script>

<template>
    <FormSection title="Administrative">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="md:col-span-2">
                <FormInput v-model="form.cin_number" label="Numéro CIN" placeholder="CIN" />
            </div>
            <FormInput v-model="form.cin_issue_date" label="Date de délivrance" type="date" />
            <FormInput v-model="form.cin_issue_place" label="Lieu de délivrance" placeholder="Lieu de délivrance" />

            <div class="md:col-span-2">
                <FormInput v-model="form.passport_number" label="Passport" placeholder="Passport" />
            </div>
            <FormInput v-model="form.passport_issue_date" label="Date de délivrance" type="date" />
            <FormInput v-model="form.passport_issue_place" label="Lieu de délivrance"
                placeholder="Lieu de délivrance" />

            <div class="md:col-span-2">
                <FormInput v-model="form.nif" label="Nif" placeholder="NIF" />
            </div>
            <div class="md:col-span-2">
                <FormInput v-model="form.stat" label="STAT" placeholder="STAT" />
            </div>
        </div>
    </FormSection>
</template>
