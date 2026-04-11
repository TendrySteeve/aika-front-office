<script setup lang="ts">
import { ref, computed } from 'vue';
import { STATUS_CHOICES } from "@/enums/choices";
import type { AuthorizationRequest } from '@/types/Authorization';

const authorizations = ref<AuthorizationRequest[]>([
    {
        id: '1',
        employee: 'Tendry',
        date_request: '2026-04-11',
        reason: 'Rendez-vous médical',
        validation_status: STATUS_CHOICES.PENDING,
        departure_time: '14:00',
        return_time: '16:00',
        duration: 2
    }
]);

const authOnCreate = ref<Partial<AuthorizationRequest>>({
    date_request: new Date().toISOString().substr(0, 10),
    departure_time: '',
    return_time: '',
    validation_status: STATUS_CHOICES.PENDING
});

// Calcul dynamique de la durée (en heures)
const calculatedDuration = computed(() => {
    if (!authOnCreate.value.departure_time || !authOnCreate.value.return_time) return 0;

    const [startH, startM] = authOnCreate.value.departure_time.split(':').map(Number);
    const [endH, endM] = authOnCreate.value.return_time.split(':').map(Number);

    let startInMinutes = 0;
    let endInMinutes = 0;

    if (startH && startM) startInMinutes = startH * 60 + startM;
    if (endH && endM) endInMinutes = endH * 60 + endM;

    if (endInMinutes <= startInMinutes) return 0;

    const diffInMinutes = endInMinutes - startInMinutes;
    return parseFloat((diffInMinutes / 60).toFixed(2)); // Retourne par ex: 1.5 pour 1h30
});

const getStatusStyle = (status: STATUS_CHOICES) => {
    switch (status) {
        case STATUS_CHOICES.PENDING: return 'bg-amber-100 text-amber-700 border-amber-200';
        case STATUS_CHOICES.ACCEPTED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case STATUS_CHOICES.REJECTED: return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
};

const handleCancel = (id: string | undefined) => {
    console.log("Annulation de la demande:", id);
};
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

            <div class="grid grid-cols-1 gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
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
                                    @click="handleCancel(auth.id)"
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

                <form class="space-y-6">
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
                        <span class="text-indigo-700 font-black text-lg">{{ calculatedDuration }} h</span>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Motif de la
                            sortie</label>
                        <textarea v-model="authOnCreate.reason" rows="3"
                            class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-indigo-500 transition-all resize-none"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
                        Soumettre
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-width="2.5" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>