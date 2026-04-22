<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { STATUS_CHOICES, PERIOD_CHOICES } from "@/enums/choices";
import type { Leave } from '@/types/Leave';
import { getStatusStyle } from '@/utils/styleUtils';
import { calculatedDayDuration } from '@/utils/calculDuration';
import LeaveServices from '@/services/LeaveServices';

const leaves = ref<Leave[]>([]);
const employee = ref<string>('');

const leaveOnCreate = ref<Leave>({
    employee: '',
    date_request: String(new Date().toISOString().split('T')[0]),
    leave_start: '',
    leave_end: '',
    start_period: PERIOD_CHOICES.AM,
    end_period: PERIOD_CHOICES.PM,
    duration: 0,
    reason: '',
    validation_status: STATUS_CHOICES.PENDING
});

const duration = computed(() => calculatedDayDuration({
  start: leaveOnCreate.value.leave_start,
  end: leaveOnCreate.value.leave_end,
  period_start: leaveOnCreate.value.start_period,
  period_end: leaveOnCreate.value.end_period,
}));

async function fetchEmployeeLeaves() {
    const matricule = localStorage.getItem('matricule');
    if (!matricule) return 'Aucun employé conneté'
    employee.value = matricule;
    try {
        const res = await LeaveServices.getEmployeeLeaves(matricule);
        leaves.value = res;
    } catch (error) {

    }
}

const createLeave = async () => {
    leaveOnCreate.value = {
        ...leaveOnCreate.value,
        employee: employee.value,
        duration: duration.value
    }

    try {
        await LeaveServices.post(leaveOnCreate.value)
        await fetchEmployeeLeaves()
    } catch (error) {

    }
}

const cancelEmployeeLeave = async (id?: number) => { 
    if (!id) return 'aucun identifiant du congé'
    try {
        await LeaveServices.cancelLeave(id);
        await fetchEmployeeLeaves()
    } catch (error) {
        
    }
}

onMounted(fetchEmployeeLeaves)
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 bg-slate-50">

        <div class="flex-1 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight">Historique des Congés</h2>
                    <p class="text-sm text-slate-500 font-medium">Consultez l'état de vos demandes passées</p>
                </div>
                <div class="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                    <span class="text-[10px] font-black text-slate-400 uppercase block">Total Demandes</span>
                    <span class="text-xl font-black text-blue-600">{{ leaves.length }}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div v-for="leave in leaves" :key="leave.id"
                    class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">

                    <div :class="getStatusStyle(leave.validation_status)" class="absolute top-0 left-0 w-1.5 h-full">
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <div
                                    class="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                    <svg class="w-6 h-6 text-slate-400 group-hover:text-blue-500" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date de
                                        demande</p>
                                    <p class="text-sm font-bold text-slate-700">{{ leave.date_request }}</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-3">
                                <button v-if="leave.validation_status === STATUS_CHOICES.PENDING"
                                    @click="cancelEmployeeLeave(leave.id)"
                                    class="flex items-center gap-2 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors group/btn">
                                    <svg class="w-4 h-4 transition-transform group-hover/btn:rotate-90" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span class="text-[10px] font-black uppercase tracking-tight">Annuler</span>
                                </button>

                                <div :class="getStatusStyle(leave.validation_status)"
                                    class="px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider shadow-sm">
                                    {{ leave.validation_status }}
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Motif de la
                                demande</p>
                            <p class="text-sm text-slate-600 font-medium leading-relaxed italic">
                                « {{ leave.reason }} »
                            </p>
                        </div>

                        <div class="flex items-center gap-6 pt-2">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2.5" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[8px] font-black text-slate-400 uppercase">Durée Totale</p>
                                    <p class="text-xs font-black text-slate-700">{{ leave.duration }} Jours</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            stroke-width="2.5" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[8px] font-black text-slate-400 uppercase">Période du congé</p>
                                    <p class="text-xs font-bold text-slate-700">Du {{ leave.leave_start }} au {{
                                        leave.leave_end }}</p>
                                </div>
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
                        class="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 class="text-xl font-black text-slate-800 uppercase tracking-tight">Nouvelle Demande</h2>
                </div>

                <form class="space-y-6" @submit.prevent="createLeave">
                    <div class="grid grid-cols-1 gap-6">
                        <div class="space-y-2">
                            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Début du
                                congé</label>
                            <div class="flex gap-2">
                                <input v-model="leaveOnCreate.leave_start" type="date"
                                    class="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all">
                                <select v-model="leaveOnCreate.start_period"
                                    class="w-24 bg-slate-50 border-2 border-slate-100 rounded-2xl px-2 py-3 text-[10px] font-black uppercase outline-none focus:border-blue-500">
                                    <option v-for="p in PERIOD_CHOICES" :key="p" :value="p">{{ p }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Fin du
                                congé</label>
                            <div class="flex gap-2">
                                <input v-model="leaveOnCreate.leave_end" type="date"
                                    class="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all">
                                <select v-model="leaveOnCreate.end_period"
                                    class="w-24 bg-slate-50 border-2 border-slate-100 rounded-2xl px-2 py-3 text-[10px] font-black uppercase outline-none focus:border-blue-500">
                                    <option v-for="p in PERIOD_CHOICES" :key="p" :value="p">{{ p }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-2xl p-4 flex justify-between items-center border transition-all duration-300"
                        :class="duration > 0
                            ? 'bg-blue-50 border-blue-100 scale-100 shadow-sm'
                            : 'bg-slate-50 border-slate-100 opacity-60 scale-95'">
                        <div class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full"
                                :class="duration > 0 ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'"></div>
                            <span class="text-xs font-black uppercase italic"
                                :class="duration > 0 ? 'text-blue-700' : 'text-slate-400'">
                                Durée Estimée
                            </span>
                        </div>

                        <div class="flex items-baseline gap-1">
                            <span class="font-black text-2xl tracking-tighter transition-colors"
                                :class="duration > 0 ? 'text-blue-700' : 'text-slate-400'">
                                {{ duration }}
                            </span>
                            <span class="text-[10px] font-black uppercase"
                                :class="duration > 0 ? 'text-blue-600/60' : 'text-slate-400'">
                                {{ duration > 1 ? 'Jours' : 'Jour' }}
                            </span>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Motif du congé</label>
                        <textarea v-model="leaveOnCreate.reason" rows="4"
                            placeholder="Expliquez brièvement la raison..."
                            class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium outline-0 focus:border-blue-500 focus:bg-white"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full px-6 py-3 rounded-2xl bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all duration-300">
                        Envoyer la demande
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>