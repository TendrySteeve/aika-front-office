<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { emmployeeApi } from '@/services/employee-api'
import type { CompleteEmployee } from '@/types/Employee'

const router = useRouter()

const employee = ref<CompleteEmployee | null>(null)
const loading = ref(true)
const errorMessage = ref('')

const matricule = () => localStorage.getItem('matricule') ?? ''

const displayValue = (value: unknown, fallback = 'Non renseigne') => {
  if (value === null || value === undefined) return fallback
  if (typeof value === 'string' && value.trim() === '') return fallback
  return String(value)
}

const fullName = computed(() => {
  if (!employee.value) return 'Collaborateur'
  const parts = [employee.value.first_name, employee.value.last_name].filter((part) => typeof part === 'string' && part.trim() !== '')
  return parts.length > 0 ? parts.join(' ') : 'Collaborateur'
})

const latestContract = computed(() => {
  const contracts = employee.value?.contracts ?? []
  if (contracts.length === 0) return null
  return [...contracts].sort((a, b) => (b.contract_start ?? '').localeCompare(a.contract_start ?? ''))[0]
})

const skillHighlights = computed(() => (employee.value?.skills ?? []).slice(0, 4))

const loadEmployeeInformation = async () => {
  loading.value = true
  errorMessage.value = ''

  const employeeMatricule = matricule()
  if (!employeeMatricule) {
    errorMessage.value = 'Aucun matricule employe disponible.'
    loading.value = false
    return
  }

  try {
    const { data } = await emmployeeApi.fetchCompleteEmployeeData(employeeMatricule)
    employee.value = data
  } catch (error) {
    console.error(error)
    errorMessage.value = "Impossible de charger les informations de l'employe."
  } finally {
    loading.value = false
  }
}

const goToForm = () => {
  router.push({ name: 'employee' })
}

onMounted(loadEmployeeInformation)
</script>

<template>
  <div class="space-y-8">
    <section class="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.14),_transparent_30%)]"></div>
      <div class="relative p-8 md:p-10">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-4">
            <span class="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-cyan-700">
              Espace employe
            </span>
            <div class="space-y-2">
              <h1 class="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{{ fullName }}</h1>
              <p class="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                Cette page presente un apercu de votre dossier employe avant de passer au formulaire complet de mise a jour.
              </p>
            </div>
            <div class="flex flex-wrap gap-3 text-sm">
              <div class="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Matricule</p>
                <p class="font-mono font-bold text-slate-800">{{ displayValue(employee?.matricule) }}</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email</p>
                <p class="font-semibold text-slate-800">{{ displayValue(employee?.email) }}</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Departement</p>
                <p class="font-semibold text-slate-800">{{ displayValue(employee?.professional_info?.department) }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              @click="loadEmployeeInformation"
              class="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
            >
              Actualiser
            </button>
            <button
              type="button"
              @click="goToForm"
              class="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-200 transition hover:bg-emerald-600"
            >
              Passer au formulaire
            </button>
          </div>
        </div>
      </div>
    </section>

    <div v-if="errorMessage" class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
      {{ errorMessage }}
    </div>

    <div v-if="loading" class="rounded-[2rem] border border-slate-200 bg-white px-8 py-10 text-slate-500 shadow-sm">
      Chargement des informations employe...
    </div>

    <template v-else-if="employee">
      <section class="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div class="mb-6 flex items-center justify-between">
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identite</p>
              <h2 class="mt-2 text-xl font-black text-slate-900">Informations personnelles</h2>
            </div>
            <div class="rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-700">
              Lecture seule
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date de naissance</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ displayValue(employee.personal_info?.birth_date) }}</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Lieu de naissance</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ displayValue(employee.personal_info?.birth_place) }}</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Genre</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ displayValue(employee.personal_info?.gender) }}</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Nationalite</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ displayValue(employee.personal_info?.nationality) }}</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Etat civil</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ displayValue(employee.personal_info?.marital_status) }}</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Nombre d'enfants</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ displayValue(employee.personal_info?.child_count) }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Situation actuelle</p>
          <h2 class="mt-2 text-2xl font-black">Statut professionnel</h2>

          <div class="mt-8 space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Poste</p>
              <p class="mt-2 text-sm font-semibold text-white">{{ displayValue(employee.professional_info?.job_title) }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Superieur</p>
              <p class="mt-2 text-sm font-semibold text-white">{{ displayValue(employee.professional_info?.superior) }}</p>
            </div>
            <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">Dernier contrat</p>
              <p class="mt-2 text-sm font-semibold text-white">{{ displayValue(latestContract?.contract_type) }}</p>
              <p class="mt-1 text-sm text-emerald-50">
                Debut: {{ displayValue(latestContract?.contract_start) }} | Lieu: {{ displayValue(latestContract?.work_location) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Coordonnees</p>
          <div class="mt-6 space-y-4 text-sm text-slate-700">
            <p><span class="font-black text-slate-900">Telephone:</span> {{ displayValue(employee.coordinates?.phone_number) }}</p>
            <p><span class="font-black text-slate-900">Adresse:</span> {{ displayValue(employee.coordinates?.home_address) }}</p>
            <p><span class="font-black text-slate-900">Urgence:</span> {{ displayValue(employee.coordinates?.emergency_contact_name) }}</p>
            <p><span class="font-black text-slate-900">Numero urgence:</span> {{ displayValue(employee.coordinates?.emergency_contact_phone) }}</p>
          </div>
        </article>

        <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Administratif</p>
          <div class="mt-6 space-y-4 text-sm text-slate-700">
            <p><span class="font-black text-slate-900">CIN:</span> {{ displayValue(employee.administrative_info?.cin_number) }}</p>
            <p><span class="font-black text-slate-900">Delivree le:</span> {{ displayValue(employee.administrative_info?.cin_issue_date) }}</p>
            <p><span class="font-black text-slate-900">Lieu:</span> {{ displayValue(employee.administrative_info?.cin_issue_place) }}</p>
            <p><span class="font-black text-slate-900">NIF:</span> {{ displayValue(employee.administrative_info?.nif) }}</p>
            <p><span class="font-black text-slate-900">STAT:</span> {{ displayValue(employee.administrative_info?.stat) }}</p>
          </div>
        </article>

        <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Banque</p>
          <div class="mt-6 space-y-4 text-sm text-slate-700">
            <p><span class="font-black text-slate-900">Mode:</span> {{ displayValue(employee.bank_info?.payment_method) }}</p>
            <p><span class="font-black text-slate-900">Banque:</span> {{ displayValue(employee.bank_info?.bank_name) }}</p>
            <p><span class="font-black text-slate-900">Compte:</span> {{ displayValue(employee.bank_info?.account_number) }}</p>
            <p><span class="font-black text-slate-900">RIB:</span> {{ displayValue(employee.bank_info?.rib) }}</p>
          </div>
        </article>
      </section>

      <section class="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Competences</p>
              <h2 class="mt-2 text-xl font-black text-slate-900">Apercu des skills</h2>
            </div>
            <span class="rounded-full bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-700">
              {{ employee.skills?.length ?? 0 }} enregistrees
            </span>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <div
              v-for="skill in skillHighlights"
              :key="`${skill.skill_name}-${skill.level}`"
              class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p class="text-sm font-black text-slate-900">{{ displayValue(skill.skill_name) }}</p>
              <p class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{{ displayValue(skill.level) }}</p>
            </div>
            <p v-if="skillHighlights.length === 0" class="text-sm text-slate-500">Aucune competence renseignee pour le moment.</p>
          </div>
        </div>

        <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Formation</p>
          <h2 class="mt-2 text-xl font-black text-slate-900">Resume du parcours</h2>

          <div class="mt-6 space-y-4">
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Diplomes</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ employee.degrees?.length ?? 0 }} element(s)</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Formations</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ employee.trainings?.length ?? 0 }} element(s)</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contrats</p>
              <p class="mt-2 text-sm font-semibold text-slate-800">{{ employee.contracts?.length ?? 0 }} element(s)</p>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
