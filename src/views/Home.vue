<script setup lang="ts">
import { emmployeeApi } from '@/services/employee-api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const matricule = ref('');
const router = useRouter();

async function checkEmployee() {
    try {
        // if (matricule.value === '' || !matricule.value) return;
        // const response = await emmployeeApi.checkEmployeeExists(matricule.value);
        // if (response.data.exists) 
        router.push({ name: 'employee' })


    } catch (error) {
    }
}
</script>
<template>
    <div
        class="min-h-screen bg-linear-210 from-blue-50 to-sky-100 text-gray-800 flex flex-col items-center justify-center p-6 md:p-12 ">

        <div
            class="w-full max-w-7xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">

            <div class="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">

                <h1 class="text-3xl md:text-5xl font-extrabold text-emerald-600 mb-6 leading-tight">
                    Bienvenue sur la plateforme<br>
                    <span class="text-blue-900">de l’Alliance AIKA</span>
                </h1>

                <div class="mb-10 w-48 h-auto flex items-center justify-center bg-gray-50 rounded-2xl p-4 shadow-inner">
                    <img src="/public/Logo.png" alt="Logo Officiel d'Alliance Aika Madagascar"
                        class="max-w-full h-auto">
                </div>

                <h4 class="text-lg md:text-xl font-medium text-gray-700 mb-6 leading-relaxed">
                    Alliance malagasy de la jeunesse pour le climat, la biodiversité et la lutte contre la
                    désertification.
                </h4>

                <p class="text-gray-600 leading-relaxed max-w-prose">
                    Cette application est dédiée aux équipes de l’Alliance AIKA afin de faciliter la gestion et l’accès
                    aux informations internes.
                </p>
            </div>

            <div
                class="lg:w-1/2 w-full max-w-md bg-blue-50/50 rounded-3xl p-8 shadow-inner border border-blue-100 flex flex-col items-center text-center">

                <div class="w-full flex flex-col items-center mb-10">
                    <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-blue-900 mb-3">
                        Accès employé
                    </h2>
                    <p class="text-sm text-gray-600">
                        Veuillez entrer votre matricule pour vérifier votre enregistrement au sein de l’Alliance AIKA.
                    </p>
                </div>

                <form @submit.prevent="checkEmployee" class="w-full space-y-6">
                    <div class="relative w-full">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h.01M21 12h-4m3 9h-4m-2-5a3 3 0 11-6 0 3 3 0 016 0z">
                                </path>
                            </svg>
                        </span>
                        <input type="text" placeholder="Ex: EM-123456" v-model="matricule"
                            class="w-full h-14 pl-12 pr-4 bg-white rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 focus:ring-opacity-20 shadow-sm text-lg placeholder:text-gray-300 placeholder:italic transition-all duration-300" />
                    </div>

                    <button type="submit"
                        class="w-full h-14 bg-emerald-600 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2">
                        Vérifier mon statut
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </form>
            </div>

        </div>
    </div>
</template>