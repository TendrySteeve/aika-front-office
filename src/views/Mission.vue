<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Mission } from '@/types/Mission';
import MissionService from '@/services/MissionServices';
import { calculatedDayDuration } from '@/utils/calculDuration';
import ButtonSubmit from '@/components/UI/ButtonSubmit.vue';

const missions = ref<Mission[]>([]);
const loading = ref(false);
const loadingSubmit = ref(false);
const missionOnCreate = ref<Mission>({
    mission_start: '',
    mission_end: '',
    duration: 0,
    project: '',
    employee: '',
    activity: '',
});

const fetchMissions = async () => {
    loading.value = true;
    try {
        const res = await MissionService.all();
        missions.value = res;
    } catch (error) {

    }
}

const createMission = async () => {
    missionOnCreate.value = {
        ...missionOnCreate.value,
        employee: localStorage.getItem('matricule') as string,
        duration: calculatedDayDuration({
            start: missionOnCreate.value.mission_start,
            end: missionOnCreate.value.mission_start
        })
    };

    loadingSubmit.value = true;

    try {
        await MissionService.post(missionOnCreate.value);
        fetchMissions();
    } catch (error) {
        console.error(error);
    } finally {
        loadingSubmit.value = false;
    }
};

const deleteMission = async (id?: number) => {
    if (!id) return;
    try {
        await MissionService.delete(id);
        fetchMissions();
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchMissions);
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 bg-slate-50">
        <div class="flex-1 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight">Historique des missions</h2>
                    <p class="text-sm text-slate-500 font-medium">Consultez vos missions</p>
                </div>
                <div class="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                    <span class="text-[10px] font-black text-slate-400 uppercase block">Total missions</span>
                    <span class="text-xl font-black text-blue-600">{{ missions.length }}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div v-if="missions.length === 0" class="text-center py-10 text-slate-400 italic">
                    Aucun mission enregistrée.
                </div>
                <div v-for="mission in missions" :key="mission.id"
                    class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    <div class="space-y-4">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <div
                                    class="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                    <svg class="w-6 h-6 text-slate-400 group-hover:text-blue-500" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date
                                        départ</p>
                                    <p class="text-sm font-bold text-slate-800">{{ mission.mission_start }}</p>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date
                                        retour</p>
                                    <p class="text-sm font-bold text-slate-800">{{ mission.mission_end }}</p>
                                </div>
                            </div>
                            <button @click="deleteMission(mission.id)" class="text-red-500 hover:text-red-700">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        <div class="text-sm text-slate-600">
                            <strong>Durée :</strong> {{ mission.duration }} jour{{ mission.duration > 1 ? 's' : '' }}
                        </div>
                        <div class="text-sm text-slate-600">
                            <strong>Projet :</strong> {{ mission.project }}
                        </div>
                        <div v-if="mission.activity" class="text-sm text-slate-600">
                            <strong>Activité :</strong> {{ mission.activity }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full lg:w-96 space-y-6">
            <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 class="text-lg font-black text-slate-800 uppercase tracking-tight mb-4">Ajouter une mission</h3>
                <form @submit.prevent="createMission" class="space-y-4">
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Date départ</label>
                        <input v-model="missionOnCreate.mission_start" type="date" required
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Date retour</label>
                        <input v-model="missionOnCreate.mission_end" type="date" required
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Projet</label>
                        <input v-model="missionOnCreate.project" type="text" required placeholder="Projet concerné"
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Activité
                            (optionnel)</label>
                        <textarea v-model="missionOnCreate.activity" placeholder="Détail sur les activités" rows="4"
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium"></textarea>
                    </div>
                    <ButtonSubmit :loading="loadingSubmit" submit-label="Ajouter"></ButtonSubmit>

                </form>
            </div>
        </div>
    </div>
</template>