<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createOrUpdateEmployee } from '@/services/createOrUpdateEmployeeServices'
import EmployeeService from '@/services/EmployeeServices'
import LoadingContent from '@/components/LoadingContent.vue'
import FormPage from '@/components/UI/FormPage.vue'
import { useEmployeeForm } from '@/composables/useEmployeeForm'
import GeneralInfoForm from '@/components/employee/GeneralInfoForm.vue'
import AdministrativeForm from '@/components/employee/AdministrativeForm.vue'
import CoordinatesForm from '@/components/employee/CoordinatesForm.vue'
import ProfessionalInfoForm from '@/components/employee/ProfessionalInfoForm.vue'
import ContractsForm from '@/components/employee/ContractsForm.vue'
import BankInfoForm from '@/components/employee/BankInfoForm.vue'
import EducationForm from '@/components/employee/EducationForm.vue'
import DegreesForm from '@/components/employee/DegreesForm.vue'
import SkillsForm from '@/components/employee/SkillsForm.vue'

const router = useRouter()
const route = useRoute()

const { form, addItem, removeItem, factories } = useEmployeeForm()

const loading = ref(false)
const loadingFetch = ref(false)
const linkedUser = ref('')
const removedContractIds = ref<number[]>([])
const removedDegreeIds = ref<number[]>([])
const removedEducationIds = ref<number[]>([])
const removedSkillIds = ref<number[]>([])

const removeFormItem = <T extends { id?: number }>(
    list: T[],
    index: number,
    removedIds: number[],
) => {
    const item = list[index]

    if (!item || list.length === 1) return
    if (item.id !== undefined) removedIds.push(item.id)

    removeItem(list, index)
}

const fetchEmployee = async () => {
    loadingFetch.value = true

    try {
        const matricule = localStorage.getItem("matricule") as string;
        const employee = await EmployeeService.get(matricule)

        form.employee = {
            matricule: employee.matricule,
            first_name: employee.first_name,
            last_name: employee.last_name,
            birth_date: employee.birth_date,
            birth_place: employee.birth_place,
            sex: employee.sex,
            nationality: employee.nationality,
            marital_status: employee.marital_status,
            child_count: employee.child_count,
            user: employee.user,
        }
        linkedUser.value = employee.user ? String(employee.user) : ''

        form.professional = employee.professional ?? {
            ...factories.createProfessional(),
            employee: employee.matricule,
        }
        form.administrative = employee.administrative ?? {
            ...factories.createAdministrative(),
            employee: employee.matricule,
        }
        form.bank = employee.bank ?? {
            ...factories.createBank(),
            employee: employee.matricule,
        }
        form.coordinate = employee.coordinate ?? {
            ...factories.createCoordinate(),
            employee: employee.matricule,
        }
        form.contracts = employee.contracts?.length
            ? employee.contracts
            : [{ ...factories.createContract(), employee: employee.matricule }]
        form.degrees = employee.degrees?.length
            ? employee.degrees
            : [{ ...factories.createDegree(), employee: employee.matricule }]
        form.educations = employee.educations?.length
            ? employee.educations
            : [{ ...factories.createEducation(), employee: employee.matricule }]
        form.skills = employee.skills?.length
            ? employee.skills
            : [{ ...factories.createSkill(), employee: employee.matricule }]

        removedContractIds.value = []
        removedDegreeIds.value = []
        removedEducationIds.value = []
        removedSkillIds.value = []
    } catch (error) {
    } finally {
        loadingFetch.value = false
    }
}

const updateEmployee = async () => {
    loading.value = true
    try {
        await Promise.all([
            ...removedContractIds.value.map((id) =>
                EmployeeService.contract.delete(form.employee.matricule, id),
            ),
            ...removedDegreeIds.value.map((id) =>
                EmployeeService.degree.delete(form.employee.matricule, id),
            ),
            ...removedEducationIds.value.map((id) =>
                EmployeeService.education.delete(form.employee.matricule, id),
            ),
            ...removedSkillIds.value.map((id) =>
                EmployeeService.skill.delete(form.employee.matricule, id),
            ),
        ])
        await createOrUpdateEmployee(
            form.employee,
            form.professional,
            form.administrative,
            form.bank,
            form.coordinate,
            form.contracts,
            form.degrees,
            form.educations,
            form.skills,
        )
        router.push({ name: 'information' })
    } catch (error: any) {
        if (error.response) console.log(error.message)
    } finally {
        loading.value = false
    }
}

onMounted(fetchEmployee)
</script>
<template>
    <LoadingContent v-if="loadingFetch" />
    <FormPage :back-to="{ name: 'information' }" title="Modifier le Profil" subtitle="Mise à jour des informations employé"
        maxWidthClass="max-w-6xl">
        <form @submit.prevent="updateEmployee" class="space-y-8 relative z-10">
            <GeneralInfoForm v-model="form.employee" />
            <AdministrativeForm v-model="form.administrative" />
            <CoordinatesForm v-model="form.coordinate" />

            <hr class="border-slate-200 my-10" />

            <ProfessionalInfoForm v-model="form.professional" />

            <ContractsForm v-model="form.contracts" @add-contract="addItem(form.contracts, factories.createContract)"
                @remove-contract="removeFormItem(form.contracts, $event, removedContractIds)" />

            <BankInfoForm v-model="form.bank" />

            <hr class="border-slate-200 my-10" />

            <EducationForm v-model="form.educations"
                @add-education="addItem(form.educations, factories.createEducation)"
                @remove-education="removeFormItem(form.educations, $event, removedEducationIds)" />

            <DegreesForm v-model="form.degrees" @add-degree="addItem(form.degrees, factories.createDegree)"
                @remove-degree="removeFormItem(form.degrees, $event, removedDegreeIds)" />

            <SkillsForm v-model="form.skills" @add-skill="addItem(form.skills, factories.createSkill)"
                @remove-skill="removeFormItem(form.skills, $event, removedSkillIds)" />

            <div class="pt-8">
                <button type="submit"
                    class="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold shadow-xl transition-all duration-300">
                    <div v-if="loading" class="w-6 h-6 border-s-2 border-white rounded-full animate-spin"></div>
                    <span v-else>Mettre à jour</span>
                </button>
            </div>
        </form>
    </FormPage>
</template>
