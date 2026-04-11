<script setup lang="ts">
import { ref } from 'vue';
import { STATUS_CHOICES } from "@/enums/choices";
import type { AuthorizationRequest } from '@/types/Authorization';

const pendingAuths = ref<AuthorizationRequest[]>([
    {
        id: 'auth_101',
        employee: 'Alice Martin',
        date_request: '2026-04-11',
        reason: 'Rendez-vous dentiste',
        departure_time: '14:00',
        return_time: '15:30',
        duration: 1.5,
        validation_status: "PENDING" as STATUS_CHOICES
    }
]);

const handleApprove = (id: string | undefined) => console.log("Approuvé:", id);
const handleReject = (id: string | undefined) => console.log("Refusé:", id);
</script>

<template>
    <div class="space-y-6">
        <div class="flex-1 overflow-y-auto max-h-[75vh] pr-2 custom-scrollbar">
            <div class="grid grid-cols-1 gap-4">
                <div v-for="auth in pendingAuths" :key="auth.id"
                    class="bg-white rounded-4xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">

                    <div class="flex items-center gap-4 w-full md:w-64 shrink-0">
                        <div
                            class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black">
                            {{ auth.employee.substring(0, 2).toUpperCase() }}
                        </div>
                        <div>
                            <h4 class="font-black text-slate-800 text-xs uppercase">{{ auth.employee }}</h4>
                            <p class="text-[10px] text-slate-400 font-bold">Le {{ auth.date_request }}</p>
                        </div>
                    </div>

                    <div class="flex-1 grid grid-cols-2 gap-4 border-l border-slate-100 pl-6">
                        <div>
                            <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Horaires</p>
                            <p class="text-xs font-bold text-slate-700">{{ auth.departure_time }} à {{ auth.return_time
                                }}</p>
                        </div>
                        <div>
                            <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Durée</p>
                            <p class="text-sm font-black text-indigo-600">{{ auth.duration }} Heures</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <button @click="handleReject(auth.id)"
                            class="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all duration-300">
                            Refuser
                        </button>
                        <button @click="handleApprove(auth.id)"
                            class="flex-1 md:flex-none px-8 py-3 rounded-2xl bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-700 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all duration-300">
                            Accepter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>