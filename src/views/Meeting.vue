<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Meeting } from '@/types/Meeting';
import MeetingService from '@/services/MeetingServices';

const meetings = ref<Meeting[]>([]);
const employee = ref<string>('');

const meetingOnCreate = ref<Meeting>({
    employee: '',
    meeting_date: String(new Date().toISOString().split('T')[0]),
    subject: '',
    participants: ''
});

async function fetchEmployeeMeetings() {
    const matricule = localStorage.getItem('matricule');
    if (!matricule) return 'Aucun employé connecté';
    employee.value = matricule;
    try {
        const res = await MeetingService.getEmployeeMeetings(matricule);
        meetings.value = res;
    } catch (error) {
        console.error(error);
    }
}

const createMeeting = async () => {
    meetingOnCreate.value = {
        ...meetingOnCreate.value,
        employee: employee.value
    };

    try {
        await MeetingService.post(meetingOnCreate.value);
        await fetchEmployeeMeetings();
        // Reset form
        meetingOnCreate.value = {
            employee: '',
            meeting_date: String(new Date().toISOString().split('T')[0]),
            subject: '',
            participants: ''
        };
    } catch (error) {
        console.error(error);
    }
};

const deleteMeeting = async (id?: number) => {
    if (!id) return;
    try {
        await MeetingService.delete(id);
        await fetchEmployeeMeetings();
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchEmployeeMeetings);
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 bg-slate-50">
        <!-- Historique des Réunions -->
        <div class="flex-1 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight">Historique des Réunions</h2>
                    <p class="text-sm text-slate-500 font-medium">Consultez vos réunions</p>
                </div>
                <div class="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                    <span class="text-[10px] font-black text-slate-400 uppercase block">Total Réunions</span>
                    <span class="text-xl font-black text-blue-600">{{ meetings.length }}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div v-if="meetings.length === 0" class="text-center py-10 text-slate-400 italic">
                    Aucune réunion enregistrée.
                </div>
                <div v-for="meeting in meetings" :key="meeting.id"
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
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                                    <p class="text-sm font-bold text-slate-800">{{ meeting.meeting_date }}</p>
                                </div>
                            </div>
                            <button @click="deleteMeeting(meeting.id)" class="text-red-500 hover:text-red-700">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        <div class="text-sm text-slate-600">
                            <strong>Sujet :</strong> {{ meeting.subject }}
                        </div>
                        <div v-if="meeting.participants" class="text-sm text-slate-600">
                            <strong>Participants :</strong> {{ meeting.participants }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Formulaire pour ajouter une réunion -->
        <div class="w-full lg:w-96 space-y-6">
            <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 class="text-lg font-black text-slate-800 uppercase tracking-tight mb-4">Ajouter une Réunion</h3>
                <form @submit.prevent="createMeeting" class="space-y-4">
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Date</label>
                        <input v-model="meetingOnCreate.meeting_date" type="date" required
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Sujet</label>
                        <input v-model="meetingOnCreate.subject" type="text" required placeholder="Sujet de la réunion"
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Participants
                            (optionnel)</label>
                        <textarea v-model="meetingOnCreate.participants" placeholder="Liste des participants"
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium"></textarea>
                    </div>
                    <button type="submit"
                        class="w-full px-6 py-3 rounded-2xl bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all duration-300">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>