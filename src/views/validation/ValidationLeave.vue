<script setup lang="ts">
import { ref } from 'vue';
import type { Leave } from '@/types/Leave';
import { STATUS_CHOICES, PERIOD_LEAVE_CHOICES } from "@/enums/choices";

const pendingLeaves = ref<Leave[]>([
    {
        id: 1,
        employee: 'Tendry Rakoto',
        date_request: '2026-04-10',
        leave_start: '2026-05-01',
        leave_end: '2026-05-05',
        start_period: PERIOD_LEAVE_CHOICES.AM, // Exemple basé sur PERIOD_LEAVE_CHOICES
        end_period: PERIOD_LEAVE_CHOICES.FULL,
        duration: 4.5,
        reason: 'Repos annuel et voyage familial',
        validation_status: "PENDING" as STATUS_CHOICES
    }
]);

const handleApprove = (id: number | undefined) => console.log("Approuvé:", id);
const handleReject = (id: number | undefined) => console.log("Refusé:", id);
</script>

<template>
    <div class="space-y-6">
        <div class="flex-1 overflow-y-auto max-h-[75vh] pr-2 custom-scrollbar">
            <div class="grid grid-cols-1 gap-4">
                <div v-for="leave in pendingLeaves" :key="leave.id"
                    class="bg-white rounded-4xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
                    
                    <div class="flex items-center gap-4 w-full md:w-64 shrink-0">
                        <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black">
                            {{ leave.employee.substring(0, 2).toUpperCase() }}
                        </div>
                        <div>
                            <h4 class="font-black text-slate-800 text-xs uppercase">{{ leave.employee }}</h4>
                            <p class="text-[10px] text-slate-400 font-bold">Le {{ leave.date_request }}</p>
                        </div>
                    </div>

                    <div class="flex-1 grid grid-cols-2 gap-4 border-l border-slate-100 pl-6">
                        <div>
                            <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Période</p>
                            <p class="text-xs font-bold text-slate-700">Du {{ leave.leave_start }} au {{ leave.leave_end }}</p>
                            <p class="text-[9px] text-blue-500 font-black uppercase italic">{{ leave.start_period }} / {{ leave.end_period }}</p>
                        </div>
                        <div>
                            <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Durée</p>
                            <p class="text-sm font-black text-slate-800">{{ leave.duration }} Jours</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <button @click="handleReject(leave.id)"
                            class="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all duration-300">
                            Refuser
                        </button>
                        <button @click="handleApprove(leave.id)"
                            class="flex-1 md:flex-none px-8 py-3 rounded-2xl bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all duration-300">
                            Valider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>