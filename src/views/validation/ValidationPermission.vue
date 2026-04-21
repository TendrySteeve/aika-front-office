<script setup lang="ts">
import PermissionServices from '@/services/PermissionServices';
import type { Permission } from '@/types/Pemission';
import { onMounted, ref } from 'vue';


const pendingPermissions = ref<Permission[]>([]);

async function fetchPerndingLeaves() {
    try {
        const res = await PermissionServices.getPendingPermissions();
        pendingPermissions.value = res;
    } catch (error) {

    }
}

const handleApprove = async (id?: number) => {
    if (!id) return 'aucun identifiant pour le congé'
    try {
        await PermissionServices.acceptPermission(id);
        await fetchPerndingLeaves()
    } catch (error) {

    }
};
const handleReject = async (id?: number) => {
    if (!id) return 'aucun identifiant pour le congé'
    try {
        await PermissionServices.rejectPermission(id);
        await fetchPerndingLeaves()
    } catch (error) {

    }
};

onMounted(fetchPerndingLeaves);
</script>
<template>
    <div class="space-y-6">
        <div class="flex-1 overflow-y-auto max-h-[75vh] pr-2 custom-scrollbar">
            <div class="grid grid-cols-1 gap-4">
                <div v-if="pendingPermissions.length === 0" class="text-center py-10 text-slate-400 italic">
                    Aucune demande de permission en attente.
                </div>

                <div v-for="permission in pendingPermissions" :key="permission.id"
                    class="bg-white rounded-4xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">

                    <div class="flex items-center gap-4 w-full md:w-64 shrink-0">
                        <div
                            class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black">
                            {{ permission.employee.substring(0, 2).toUpperCase() }}
                        </div>
                        <div>
                            <h4 class="font-black text-slate-800 text-xs uppercase">{{ permission.employee }}</h4>
                            <p class="text-[10px] text-slate-400 font-bold">Le {{ permission.date_request }}</p>
                        </div>
                    </div>

                    <div class="flex-1 grid grid-cols-2 gap-4 border-l border-slate-100 pl-6">
                        <div>
                            <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Période (Permission)</p>
                            <p class="text-xs font-bold text-slate-700">Du {{ permission.permission_start }} au {{ permission.permission_end }}</p>
                            <p class="text-[9px] text-blue-500 font-black uppercase italic">
                                {{ permission.start_period }} / {{ permission.end_period }}
                            </p>
                            <p class="text-[10px] text-slate-500 mt-2 line-clamp-1"><span class="font-bold">Motif:</span> {{ permission.reason }}</p>
                        </div>
                        <div>
                            <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Durée</p>
                            <p class="text-sm font-black text-slate-800">{{ permission.duration }} Jours</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <button @click="handleReject(permission.id)"
                            class="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all duration-300">
                            Refuser
                        </button>
                        <button @click="handleApprove(permission.id)"
                            class="flex-1 md:flex-none px-8 py-3 rounded-2xl bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all duration-300">
                            Valider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

