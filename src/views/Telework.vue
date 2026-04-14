<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Telework } from '@/types/Telework';
import TeleworkService from '@/services/TeleworkServices';

const teleworks = ref<Telework[]>([]);
const employee = ref<string>('');

const teleworkOnCreate = ref<Telework>({
    employee: '',
    telework_date: String(new Date().toISOString().split('T')[0]),
    location: ''
});

async function fetchEmployeeTeleworks() {
    const matricule = localStorage.getItem('matricule');
    if (!matricule) return 'Aucun employé connecté';
    employee.value = matricule;
    try {
        const res = await TeleworkService.getEmployeeTeleworks(matricule);
        teleworks.value = res;
    } catch (error) {
        console.error(error);
    }
}

const createTelework = async () => {
    teleworkOnCreate.value = {
        ...teleworkOnCreate.value,
        employee: employee.value
    };

    try {
        await TeleworkService.post(teleworkOnCreate.value);
        await fetchEmployeeTeleworks();
        // Reset form
        teleworkOnCreate.value = {
            employee: '',
            telework_date: String(new Date().toISOString().split('T')[0]),
            location: ''
        };
    } catch (error) {
        console.error(error);
    }
};

const deleteTelework = async (id?: number) => {
    if (!id) return;
    try {
        await TeleworkService.delete(id);
        await fetchEmployeeTeleworks();
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchEmployeeTeleworks);
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 bg-slate-50">
        <div class="flex-1 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight">Historique des Télétravails</h2>
                    <p class="text-sm text-slate-500 font-medium">Consultez vos sessions de télétravail</p>
                </div>
                <div class="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                    <span class="text-[10px] font-black text-slate-400 uppercase block">Total Sessions</span>
                    <span class="text-xl font-black text-blue-600">{{ teleworks.length }}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div v-if="teleworks.length === 0" class="text-center py-10 text-slate-400 italic">
                    Aucune session de télétravail enregistrée.
                </div>
                <div v-for="telework in teleworks" :key="telework.id"
                    class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    <div class="space-y-4">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                    <svg class="w-6 h-6 text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                                    <p class="text-sm font-bold text-slate-800">{{ telework.telework_date }}</p>
                                </div>
                            </div>
                            <button @click="deleteTelework(telework.id)" class="text-red-500 hover:text-red-700">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        <div v-if="telework.location" class="text-sm text-slate-600">
                            <strong>Lieu :</strong> {{ telework.location }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Formulaire pour ajouter un télétravail -->
        <div class="w-full lg:w-96 space-y-6">
            <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 class="text-lg font-black text-slate-800 uppercase tracking-tight mb-4">Ajouter un Télétravail</h3>
                <form @submit.prevent="createTelework" class="space-y-4">
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Date</label>
                        <input v-model="teleworkOnCreate.telework_date" type="date" required
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Lieu (optionnel)</label>
                        <input v-model="teleworkOnCreate.location" type="text" placeholder="Ex: Domicile"
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-0 text-sm font-medium">
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