<script setup lang="ts">
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormSection from './FormSection.vue'
import { getContractTypeLabel } from '@/utils/choicesLabel'
import { CONTRACT_TYPE_CHOICES } from '@/enums/choices'
import type { Contract } from '@/types/Employee'

const forms = defineModel<Contract[]>({ required: true })

const emit = defineEmits<{
    'add-contract': []
    'remove-contract': [index: number]
}>()

const addContract = () => {
    emit('add-contract')
}

const removeContract = (index: number) => {
    emit('remove-contract', index)
}
</script>

<template>
    <FormSection title="Contract" show-button button-text="Ajouter un contrat" @add-item="addContract">
        <div v-for="(contract, index) in forms" :key="`contract-${index}`"
            class="space-y-6 rounded-4xl border border-slate-100 bg-slate-50/60 p-6">
            <div class="flex items-center justify-between gap-4">
                <p class="text-xs font-black uppercase tracking-widest text-slate-500">
                    Contrat {{ index + 1 }}
                </p>
                <button type="button" @click="removeContract(index)" :disabled="forms.length === 1"
                    class="rounded-2xl bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
                    Supprimer
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
                <FormSelect v-model="contract.contract_type" label="Type du contrat" :options="CONTRACT_TYPE_CHOICES"
                    :get-label="getContractTypeLabel" bg-color="bg-white" />
                <FormInput v-model="contract.contract_start" label="Date début" type="date" bg-color="bg-white" />
                <FormInput v-model="contract.contract_end" label="Date fin" type="date" bg-color="bg-white" />
                <div class="md:col-span-2">
                    <FormInput v-model="contract.work_location" label="Lieu d'affectation"
                        placeholder="Lieu d'affectation" bg-color="bg-white" />
                </div>
            </div>
        </div>
    </FormSection>
</template>
