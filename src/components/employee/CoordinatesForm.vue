<script setup lang="ts">
import type { Coordinate } from '@/types/Employee';
import FormInput from './FormInput.vue'
import FormSection from './FormSection.vue'


const form = defineModel<Coordinate>({required: true})
</script>

<template>
    <FormSection title="Coordonnées">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput v-model="form.phone_number" 
                label="Numéro téléphone" placeholder="Téléphone" type="phone" />
            <FormInput v-model="form.email"  label="Email"
                placeholder="Email" type="email" />
            <FormInput v-model="form.home_address" 
                label="Adresse domicile" placeholder="Adresse domicile" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput v-model="form.emergency_contact_name"
                 label="Nom du contacte d'urgence"
                placeholder="Nom du contact" />
            <FormInput v-model="form.emergency_contact_phone"
                
                label="Téléphone du contacte d'urgence" placeholder="Numéro téléphone" type="phone" />
        </div>
    </FormSection>
</template>
