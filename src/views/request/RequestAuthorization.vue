<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { STATUS_CHOICES } from "@/enums/choices";
import type { AuthorizationRequest } from '@/types/Authorization';
import { calculatedHourDuration } from '@/utils/calculDuration';
import AuthorizationService from '@/services/AuthorizationServices';
import { getStatusStyle } from '@/utils/styleUtils';

const employee = ref('');
const authorizations = ref<AuthorizationRequest[]>([]);

const authOnCreate = ref<AuthorizationRequest>({
    employee: '',
    date_request: String(new Date().toISOString().split('T')[0]),
    reason: '',
    validation_status: STATUS_CHOICES.PENDING,
    departure_time: '',
    return_time: '',
    duration: 0
});

const duration = computed(() => calculatedHourDuration(authOnCreate.value));


async function fetchEmployeeAuthorizations() {
    const matricule = localStorage.getItem('matricule');
    if (!matricule) return 'Aucun employé conneté'
    employee.value = matricule;
    try {
        const res = await AuthorizationService.getEmployeeAuthorizations(matricule);
        authorizations.value = res;
    } catch (error) {
        
    }
}

const createLeave = async () => {
    authOnCreate.value = {
        ...authOnCreate.value,
        employee: employee.value,
        duration: duration.value
    }

    try {
        await AuthorizationService.post(authOnCreate.value)
        await fetchEmployeeAuthorizations()
    } catch (error) {

    }
}

const cancelEmployeeAuthorization = async (id?: number) => {
     if (!id) return 'aucun identifiant de l\'autorisation'
    try {
        await AuthorizationService.cancelAuhtorization(id);
        await fetchEmployeeAuthorizations()
    } catch (error) {
        
    }
};


onMounted(fetchEmployeeAuthorizations)
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 bg-slate-50">

        <div class="flex-1 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight">Autorisations de Sortie</h2>
                    <p class="text-sm text-slate-500 font-medium">Suivez vos demandes d'absences temporaires</p>
                </div>
                <div class="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                    <span class="text-[10px] font-black text-slate-400 uppercase block">Total</span>
                    <span class="text-xl font-black text-indigo-600">{{ authorizations.length }}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div v-for="auth in authorizations" :key="auth.id"
                    class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">

                    <div :class="getStatusStyle(auth.validation_status)" class="absolute top-0 left-0 w-1.5 h-full">
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-start justify-between">
                            <div class="flex items-center gap-4">
                                <div class="bg-indigo-50 p-3 rounded-2xl border border-indigo-100 text-indigo-500">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                                    <p class="text-sm font-bold text-slate-700">{{ auth.date_request }}</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-3">
                                <button v-if="auth.validation_status === STATUS_CHOICES.PENDING"
                                    @click="cancelEmployeeAuthorization(auth.id)"
                                    class="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors group/btn">
                                    <svg class="w-5 h-5 transition-transform group-hover/btn:rotate-90" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div :class="getStatusStyle(auth.validation_status)"
                                    class="px-4 py-1.5 rounded-full border text-[10px] font-black uppercase">
                                    {{ auth.validation_status }}
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Motif</p>
                            <p class="text-sm text-slate-600 font-medium italic">« {{ auth.reason }} »</p>
                        </div>

                        <div class="flex items-center gap-8">
                            <div>
                                <p class="text-[8px] font-black text-slate-400 uppercase">Horaires</p>
                                <p class="text-xs font-bold text-slate-700">{{ auth.departure_time }} — {{
                                    auth.return_time }}</p>
                            </div>
                            <div>
                                <p class="text-[8px] font-black text-slate-400 uppercase">Durée estimée</p>
                                <p class="text-xs font-black text-indigo-600">{{ auth.duration }} Heure(s)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full lg:w-112.5">
            <div class="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl lg:sticky lg:top-8">
                <div class="flex items-center gap-3 mb-8">
                    <div
                        class="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4v16m8-8H4" stroke-width="2.5" />
                        </svg>
                    </div>
                    <h2 class="text-xl font-black text-slate-800 uppercase tracking-tight">Nouvelle Sortie</h2>
                </div>

                <form class="space-y-6" @submit.prevent="createLeave">
                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Date de
                            sortie</label>
                        <input v-model="authOnCreate.date_request" type="date"
                            class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Heure de
                                départ</label>
                            <input v-model="authOnCreate.departure_time" type="time"
                                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Heure de
                                retour</label>
                            <input v-model="authOnCreate.return_time" type="time"
                                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all">
                        </div>
                    </div>

                    <div
                        class="bg-indigo-50 rounded-2xl p-4 flex justify-between items-center border border-indigo-100">
                        <span class="text-indigo-700 text-xs font-black uppercase italic">Durée Totale</span>
                        <span class="text-indigo-700 font-black text-lg">{{ duration }} h</span>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Motif de la
                            sortie</label>
                        <textarea v-model="authOnCreate.reason" rows="3"
                            class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-indigo-500 transition-all resize-none"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full px-6 py-3 rounded-2xl bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all duration-300">
                        Soumettre
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>