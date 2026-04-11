<script setup lang="ts">
import { ArrowLeftEndOnRectangleIcon, CalendarDaysIcon, CheckBadgeIcon, DocumentTextIcon, IdentificationIcon } from '@heroicons/vue/16/solid';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const navigationItems = computed(() => [
    {
        label: 'Informations employe',
        to: { name: 'employee' },
        icon: IdentificationIcon,
        active: route.name === 'employee',
    },
    {
        label: 'Demande',
        to: { name: 'leave-request' },
        icon: DocumentTextIcon,
        active: route.path.includes('/request'),
    },
    {
        label: 'Validation',
        to: { name: 'leave-validation' },
        icon: CheckBadgeIcon,
        active: route.path.includes('/validation'),
    },
    // {
    //     label: 'Planning',
    //     to: { name: 'planning' },
    //     icon: CalendarDaysIcon,
    //     active: route.name === 'planning',
    // },
])

const exitApp = () => {
    router.push({ name: 'home' })
}

</script>
<template>
    <div>
        <div class="flex h-screen bg-gray-50 font-sans">
            <header class="w-72 bg-blue-900 text-white flex flex-col shadow-2xl">
                <div class="p-8 flex items-center justify-center border-b border-blue-800/50">
                    <div class="bg-white p-3 rounded-2xl shadow-sm">
                        <img src="/public/Logo.png" alt="Alliance AIKA" class="h-12 w-auto object-contain">
                    </div>
                </div>

                <nav class="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    <RouterLink v-for="item in navigationItems" :key="item.label" :to="item.to" :class="[
                        'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group',
                        item.active
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                            : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    ]">
                        <component :is="item.icon" class="w-6 h-6 transition-colors"
                            :class="item.active ? 'text-white' : 'text-blue-300 group-hover:text-white'" />
                        <span class="font-medium">{{ item.label }}</span>
                    </RouterLink>
                </nav>

                <div class="p-6 border-t border-blue-800/50">
                    <button @click="exitApp"
                        class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-800/50 hover:bg-red-500/20 hover:text-red-300 text-blue-200 rounded-xl transition-all duration-300 group border border-transparent hover:border-red-500/30">
                        <ArrowLeftEndOnRectangleIcon class="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        <span class="font-semibold text-sm uppercase tracking-wider">Sortir</span>
                    </button>
                </div>
            </header>

            <main class="flex-1 flex flex-col overflow-hidden">
                <div class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
                    <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                        Plateforme Interne
                    </h2>
                    <div class="flex items-center gap-4">
                        <span
                            class="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full uppercase">
                            Membre Actif
                        </span>
                    </div>
                </div>

                <section class="flex-1 overflow-y-auto p-8">
                    <div class="max-w-6xl mx-auto">
                        <RouterView />
                    </div>
                </section>
            </main>
        </div>
    </div>
</template>