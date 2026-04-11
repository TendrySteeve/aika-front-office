<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const requestNavigations = computed(() => [
    {
        label: 'Congés',
        to: { name: 'leave-request' },
        active: route.path === '/app/request',
    },
    {
        label: 'Autorisations',
        to: { name: 'authorization-request' },
        active: route.name === 'authorization-request', // Vérifie bien si c'est 'authorization' ou 'authorization-request'
    },
    {
        label: 'Permissions',
        to: { name: 'permission-request' },
        active: route.name === 'permission-request',
    },
])

onMounted(() => {
    console.log(route.path)
})
</script>

<template>
    <div class="w-full mb-8">
        <header class="bg-white border border-slate-200 p-1.5 rounded-2xl inline-flex items-center gap-1 shadow-sm">
            <RouterLink 
                v-for="nav in requestNavigations" 
                :key="nav.label"
                :to="nav.to" 
                :class="[
                    'flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300',
                    nav.active 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                        : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                ]"
            >
                {{ nav.label }}
            </RouterLink>
        </header>
        
        <div class="mt-4 border-b border-slate-100 w-full">
            <RouterView />
        </div>
    </div>
</template>