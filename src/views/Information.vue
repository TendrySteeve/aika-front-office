<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EmployeeService from '@/services/EmployeeServices'
import type { EmployeeComplet } from '@/types/Employee'

import {
    getSexLabel,
    getMaritalStatusLabel,
    getContractTypeLabel,
    getLevelSkillLabel
} from '@/utils/choicesLabel'
import LoadingContent from '@/components/LoadingContent.vue'

const router = useRouter()
const route = useRoute()

const employee = ref<EmployeeComplet | null>(null)
const loading = ref(false)

const fetchEmployee = async () => {
    loading.value = true
    try {
        const matricule = localStorage.getItem("matricule") as string;
        employee.value = await EmployeeService.get(matricule)
    } catch (error) {
        console.error(error)
        router.push({ name: 'employee' })
    } finally {
        loading.value = false
    }
}

const formatDate = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('fr-FR')
}


onMounted(fetchEmployee)
</script><template>
    <LoadingContent v-if="loading" />

    <div class="max-w-5xl mx-auto px-4 py-6">

        <!-- Actions -->
        <div class="flex gap-3 mb-6">
            <button @click="router.push({ name: 'employee' })"
                class="px-5 py-2 text-sm font-medium rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 transition-colors">
                Modifier les informations
            </button>
        </div>

        <!-- Contenu PDF -->
        <div v-if="employee" id="pdf-content" class="rounded-xl overflow-hidden shadow-lg border border-gray-200">

            <!-- EN-TÊTE -->
            <div class="bg-blue-900 text-white px-10 py-9 relative overflow-hidden">
                <!-- Cercle décoratif -->
                <div class="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/4 pointer-events-none"></div>

                <p class="text-[10px] tracking-[3px] uppercase text-amber-200/80 mb-2">
                    Dossier Ressources Humaines
                </p>
                <h1 class="font-serif text-3xl font-bold leading-tight mb-1">
                    {{ employee.first_name }} {{ employee.last_name }}
                </h1>
                <p class="text-xs text-white/50 tracking-wide mb-4">
                    Matricule : {{ employee.matricule }}
                </p>

                <!-- Badges rapides -->
                <div class="flex flex-wrap gap-2">
                    <span v-if="employee.professional?.job_title"
                        class="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 text-xs text-white/85">
                        💼 {{ employee.professional.job_title }}
                    </span>
                    <span v-if="employee.professional?.departement"
                        class="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 text-xs text-white/85">
                        🏢 {{ employee.professional.departement }}
                    </span>
                </div>

                <p class="absolute bottom-4 right-10 text-[10px] text-white/30 tracking-wide">
                    Généré le {{ new Date().toLocaleDateString('fr-FR') }}
                </p>
            </div>

            <!-- CORPS -->
            <div class="bg-white px-10 py-8 space-y-7">

                <!-- ── INFORMATIONS GÉNÉRALES ── -->
                <section>
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">
                            Informations générales
                        </h2>
                    </div>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div class="field">
                            <label
                                class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Prénom</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.first_name }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Nom</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.last_name }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Date de
                                naissance</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ formatDate(employee.birth_date) }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Lieu de
                                naissance</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.birth_place }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Sexe</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ getSexLabel(employee.sex) }}</p>
                        </div>
                        <div class="field">
                            <label
                                class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Nationalité</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.nationality }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Situation
                                matrimoniale</label>
                            <p class="text-[13px] font-medium text-gray-900">{{
                                getMaritalStatusLabel(employee.marital_status) }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Nombre
                                d'enfants</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.child_count ?? '—' }}</p>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-100">

                <!-- ── COORDONNÉES ── -->
                <section v-if="employee.coordinate">
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">Coordonnées</h2>
                    </div>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div class="field">
                            <label
                                class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Téléphone</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.coordinate.phone_number }}</p>
                        </div>
                        <div class="field">
                            <label
                                class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Email</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.coordinate.email }}</p>
                        </div>
                        <div class="col-span-2 field">
                            <label
                                class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Adresse</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.coordinate.home_address }}</p>
                        </div>
                        <div v-if="employee.coordinate.emergency_contact_name" class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Contact
                                d'urgence</label>
                            <p class="text-[13px] font-medium text-gray-900">{{
                                employee.coordinate.emergency_contact_name }}</p>
                        </div>
                        <div v-if="employee.coordinate.emergency_contact_phone" class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Téléphone
                                urgence</label>
                            <p class="text-[13px] font-medium text-gray-900">{{
                                employee.coordinate.emergency_contact_phone }}</p>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-100">

                <!-- ── ADMINISTRATIF ── -->
                <section v-if="employee.administrative">
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">Informations
                            administratives</h2>
                    </div>
                    <div class="grid grid-cols-3 gap-x-5 gap-y-3">
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">N°
                                CIN</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.administrative.cin_number }}
                            </p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Date
                                délivrance CIN</label>
                            <p class="text-[13px] font-medium text-gray-900">{{
                                formatDate(employee.administrative.cin_issue_date) }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Lieu
                                délivrance CIN</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.administrative.cin_issue_place
                                }}</p>
                        </div>
                        <template v-if="employee.administrative.passport_number">
                            <div class="field">
                                <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">N°
                                    Passeport</label>
                                <p class="text-[13px] font-medium text-gray-900">{{
                                    employee.administrative.passport_number }}</p>
                            </div>
                            <div class="field">
                                <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Date
                                    délivrance</label>
                                <p class="text-[13px] font-medium text-gray-900">{{
                                    formatDate(employee.administrative.passport_issue_date!) }}</p>
                            </div>
                            <div class="field">
                                <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Lieu
                                    délivrance</label>
                                <p class="text-[13px] font-medium text-gray-900">{{
                                    employee.administrative.passport_issue_place }}</p>
                            </div>
                        </template>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">NIF</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.administrative.nif }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">STAT</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.administrative.stat }}</p>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-100">

                <!-- ── PROFESSIONNEL ── -->
                <section v-if="employee.professional">
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">Informations
                            professionnelles
                        </h2>
                    </div>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div class="field">
                            <label
                                class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Département</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.professional.departement }}</p>
                        </div>
                        <div class="field">
                            <label
                                class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Poste</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.professional.job_title }}</p>
                        </div>
                        <div v-if="employee.professional.superior" class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Supérieur
                                hiérarchique</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.professional.superior }}</p>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-100">

                <!-- ── BANQUE ── -->
                <section v-if="employee.bank">
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">Informations
                            bancaires</h2>
                    </div>
                    <div class="grid grid-cols-3 gap-x-5 gap-y-3">
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Mode de
                                paiement</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.bank.payment_method }}</p>
                        </div>
                        <div class="field">
                            <label
                                class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Banque</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.bank.bank_name }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">RIB</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.bank.rib }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">N° de
                                compte</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.bank.account_number }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Code
                                guichet</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.bank.code_guichet }}</p>
                        </div>
                        <div class="field">
                            <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Code
                                banque</label>
                            <p class="text-[13px] font-medium text-gray-900">{{ employee.bank.code_bank }}</p>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-100">

                <!-- ── CONTRATS ── -->
                <section v-if="employee.contracts?.length">
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">Contrats</h2>
                    </div>
                    <div class="space-y-3">
                        <div v-for="c in employee.contracts" :key="c.id"
                            class="border border-gray-200 border-l-[3px] border-l-blue-900 rounded-r-lg bg-gray-50 px-4 py-3.5">
                            <span
                                class="inline-block bg-blue-900 text-amber-200 text-[9px] tracking-wide px-3 py-0.5 rounded-full uppercase mb-3">
                                {{ getContractTypeLabel(c.contract_type) }}
                            </span>
                            <div class="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                                <div class="field">
                                    <label
                                        class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Type</label>
                                    <p class="text-[13px] font-medium text-gray-900">{{
                                        getContractTypeLabel(c.contract_type) }}</p>
                                </div>
                                <div class="field">
                                    <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Date
                                        de
                                        début</label>
                                    <p class="text-[13px] font-medium text-gray-900">{{ formatDate(c.contract_start) }}
                                    </p>
                                </div>
                                <div class="field">
                                    <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Date
                                        de fin</label>
                                    <p class="text-[13px] font-medium"
                                        :class="c.contract_end ? 'text-gray-900' : 'text-gray-400 italic'">
                                        {{ c.contract_end ? formatDate(c.contract_end) : '—' }}
                                    </p>
                                </div>
                                <div class="field">
                                    <label class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Lieu
                                        de
                                        travail</label>
                                    <p class="text-[13px] font-medium text-gray-900">{{ c.work_location }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-100">

                <!-- ── DIPLÔMES ── -->
                <section v-if="employee.degrees?.length">
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">Diplômes</h2>
                    </div>
                    <div class="space-y-3">
                        <div v-for="d in employee.degrees" :key="d.id"
                            class="border border-gray-200 border-l-[3px] border-l-blue-900 rounded-r-lg bg-gray-50 px-4 py-3.5">
                            <div class="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                                <div class="field">
                                    <label
                                        class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Diplôme</label>
                                    <p class="text-[13px] font-medium text-gray-900">{{ d.degree_name }}</p>
                                </div>
                                <div class="field">
                                    <label
                                        class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Établissement</label>
                                    <p class="text-[13px] font-medium text-gray-900">{{ d.institution }}</p>
                                </div>
                                <div v-if="d.graduation_year" class="field">
                                    <label
                                        class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Année
                                        d'obtention</label>
                                    <p class="text-[13px] font-medium text-gray-900">{{ d.graduation_year }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-100">

                <!-- ── FORMATIONS ── -->
                <section v-if="employee.educations?.length">
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">Formations</h2>
                    </div>
                    <div class="space-y-3">
                        <div v-for="e in employee.educations" :key="e.id"
                            class="border border-gray-200 border-l-[3px] border-l-blue-900 rounded-r-lg bg-gray-50 px-4 py-3.5">
                            <div class="grid grid-cols-2 gap-x-6 gap-y-2">
                                <div class="field">
                                    <label
                                        class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Niveau</label>
                                    <p class="text-[13px] font-medium text-gray-900">{{ e.level }}</p>
                                </div>
                                <div class="field">
                                    <label
                                        class="block text-[9px] uppercase tracking-[1.5px] text-gray-400 mb-0.5">Établissement</label>
                                    <p class="text-[13px] font-medium text-gray-900">{{ e.institution }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-100">

                <!-- ── COMPÉTENCES ── -->
                <section v-if="employee.skills?.length">
                    <div class="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200">
                        <div class="w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                        <h2 class="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-500">Compétences</h2>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <div v-for="s in employee.skills" :key="s.id"
                            class="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5 text-[12px] text-gray-800">
                            <span class="font-medium">{{ s.skill_name }}</span>
                            <span class="text-gray-400 text-[11px]">· {{ getLevelSkillLabel(s.level) }}</span>
                        </div>
                    </div>
                </section>

            </div>

            <!-- PIED DE PAGE -->
            <div
                class="bg-gray-50 border-t border-gray-200 px-10 py-3.5 text-center text-[10px] text-gray-400 tracking-wide">
                Document confidentiel — Généré automatiquement le {{ new Date().toLocaleDateString('fr-FR') }} —
                Ressources Humaines
            </div>

        </div>
    </div>
</template>