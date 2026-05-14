<script setup lang="ts">
import type { Bank } from '@/types/Employee';
import FormInput from './FormInput.vue'
import FormSection from './FormSection.vue'

const form =  defineModel<Bank>({required: true})
</script>

<template>
    <FormSection title="Informations bancaires">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput v-model="form.payment_method"
                 label="Mode de paiement"
                placeholder="Mode de paiement" />
            <div class="md:col-span-2">
                <FormInput v-model="form.bank_name" 
                    label="Nom de la banque" placeholder="Nom de la banque" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-9 gap-6">
            <div class="md:col-span-2">
                <FormInput v-model="form.code_bank" 
                    label="Code banque" placeholder="xxxxx" :maxlength="5" />
            </div>
            <div class="md:col-span-2">
                <FormInput v-model="form.code_guichet"
                     label="Code guichet" placeholder="xxxxx"
                    :maxlength="5" />
            </div>
            <div class="md:col-span-4">
                <FormInput v-model="form.account_number"
                     label="Numéro de compte"
                    placeholder="xxxxxxxxxxx" :maxlength="11" />
            </div>
            <FormInput v-model="form.rib"  label="rib"
                placeholder="xx" :maxlength="2" />
        </div>
    </FormSection>
</template>
