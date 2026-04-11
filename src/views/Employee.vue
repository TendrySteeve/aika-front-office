<script setup lang="ts">
import { ref } from 'vue';
import type { Administrative, BankInfo, Contract, Degree, Employee, PersonalInfo, ProfessionalInfo, Skill, Training, Coordinate } from '@/types/Employee';
import { GENDER_CHOICES, MARITAL_STATUS_CHOICES, CONTRACT_TYPE_CHOICES, LEVEL_SKILL_CHOICES } from "@/enums/choices";

const employee = ref<Partial<Employee>>({});
const personalInfo = ref<Partial<PersonalInfo>>({});
const coordinate = ref<Partial<Coordinate>>({});
const administrative = ref<Partial<Administrative>>({});
const professionalInfo = ref<Partial<ProfessionalInfo>>({});
const contract = ref<Partial<Contract>>({});
const bankInfo = ref<Partial<BankInfo>>({});

const contracts = ref<Partial<Contract>[]>([{ contract_type: CONTRACT_TYPE_CHOICES.CDD, start_date: '', work_location: '' }]);
const degrees = ref<Partial<Degree>[]>([{ degree_name: '', institution: '', graduation_year: '' }]);
const trainings = ref<Partial<Training>[]>([{ training_name: '', starts_on: '', ends_on: '', location: '' }]);
const skills = ref<Partial<Skill>[]>([{ skill_name: '', level: LEVEL_SKILL_CHOICES.beginner, description: '' }]);

const addEntry = (list: any[], obj: any) => list.push({ ...obj });
const removeEntry = (list: any[], index: number) => list.splice(index, 1);
</script>
<template>
    <div class="max-w-6xl mx-auto pb-32 px-4 sm:px-8 bg-slate-50/30">

        <header
            class="mb-12 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-8 gap-6">
            <div class="space-y-1">
                <h1 class="text-3xl font-black text-slate-900 tracking-tight uppercase">Dossier <span
                        class="text-blue-600">Collaborateur</span></h1>
                <p class="text-slate-500 font-medium text-sm flex items-center gap-2 italic">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Alliance AIKA — Système de gestion interne
                </p>
            </div>
            <div class="px-6 py-3 bg-blue-50 border border-blue-100 rounded-2xl">
                <span class="text-[10px] font-black text-blue-400 uppercase tracking-widest block">Matricule</span>
                <span class="text-blue-900 font-mono font-bold">{{ employee.matricule || '---' }}</span>
            </div>
        </header>

        <form @submit.prevent="" class="space-y-12">

            <section
                class="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                <h2 class="text-xl font-black text-slate-800 uppercase tracking-tight mb-8 flex items-center gap-3">
                    <span
                        class="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">01</span>
                    Informations Personnelles & Administratives
                </h2>

                <div class="space-y-10">
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prénom</label>
                            <input v-model="employee.first_name" type="text"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition-all outline-none"
                                placeholder="Prénom">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom</label>
                            <input v-model="employee.last_name" type="text"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition-all outline-none"
                                placeholder="Nom">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Genre</label>
                            <select v-model="personalInfo.gender"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-slate-700 text-sm focus:border-blue-500 focus:bg-white outline-none appearance-none cursor-pointer">
                                <option v-for="g in GENDER_CHOICES" :key="g" :value="g">{{ g }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nationalité</label>
                            <input v-model="personalInfo.nationality" type="text"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition-all outline-none"
                                placeholder="Ex: Malagasy">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-slate-50">
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date de
                                Naissance</label>
                            <input v-model="personalInfo.birth_date" type="date"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lieu de
                                Naissance</label>
                            <input v-model="personalInfo.birth_place" type="text"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                                placeholder="Ville">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">État
                                Civil</label>
                            <select v-model="personalInfo.marital_status"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-sm outline-none focus:border-blue-500 focus:bg-white appearance-none cursor-pointer">
                                <option v-for="status in MARITAL_STATUS_CHOICES" :key="status" :value="status">{{ status
                                }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre
                                d'enfants</label>
                            <input v-model="personalInfo.child_count" type="number" min="0"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                        <div class="space-y-4 p-6 bg-blue-50/30 rounded-3xl border border-blue-100/50">
                            <span class="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] ml-1">Carte
                                d'Identité Nationale (CIN)</span>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input v-model="administrative.cin_number" placeholder="Numéro CIN"
                                    class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 transition-all shadow-sm">
                                <input v-model="administrative.cin_issue_date" type="date"
                                    class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 transition-all shadow-sm">
                                <input v-model="administrative.cin_issue_place" placeholder="Lieu de délivrance"
                                    class="md:col-span-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 transition-all shadow-sm">
                            </div>
                        </div>
                        <div class="space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-200/50">
                            <span
                                class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Passeport
                                (Optionnel)</span>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input v-model="administrative.passport_number" placeholder="Numéro Passeport"
                                    class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 transition-all shadow-sm">
                                <input v-model="administrative.passport_issue_date" type="date"
                                    class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 transition-all shadow-sm">
                                <input v-model="administrative.passport_issue_place" placeholder="Lieu de délivrance"
                                    class="md:col-span-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 transition-all shadow-sm">
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                        <div class="space-y-6">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="flex flex-col gap-2">
                                    <label
                                        class="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">NIF</label>
                                    <input v-model="administrative.nif" type="text"
                                        class="w-full px-5 py-3.5 rounded-xl border-2 border-emerald-50 bg-emerald-50/20 text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label
                                        class="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">STAT</label>
                                    <input v-model="administrative.stat" type="text"
                                        class="w-full px-5 py-3.5 rounded-xl border-2 border-emerald-50 bg-emerald-50/20 text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all">
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label
                                    class="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Téléphone
                                    Personnel</label>
                                <input v-model="coordinate.phone_number" type="tel"
                                    class="w-full px-5 py-3.5 rounded-xl border-2 border-blue-50 bg-blue-50/30 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                                    placeholder="+261 -- -- --- --">
                            </div>
                            <div class="flex flex-col gap-2">
                                <label
                                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Adresse
                                    Domicile</label>
                                <textarea v-model="coordinate.home_address" rows="2"
                                    class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                                    placeholder="Adresse complète..."></textarea>
                            </div>
                        </div>

                        <div
                            class="p-8 bg-slate-50 rounded-4xl border border-slate-200/60 flex flex-col justify-center space-y-5">
                            <div class="flex items-center gap-3 mb-2">
                                <div
                                    class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                                    </svg>
                                </div>
                                <div>
                                    <span
                                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Contact
                                        d'Urgence</span>
                                    <p class="text-[11px] text-slate-500 italic">Personne à prévenir en cas de besoin
                                    </p>
                                </div>
                            </div>
                            <input v-model="coordinate.emergency_contact_name" placeholder="Nom complet du contact"
                                class="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 transition-all shadow-sm">
                            <input v-model="coordinate.emergency_contact_phone" placeholder="Numéro de téléphone"
                                class="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 transition-all shadow-sm">
                        </div>
                    </div>
                </div>
            </section>

            <section
                class="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                <h2 class="text-xl font-black text-slate-800 uppercase tracking-tight mb-8 flex items-center gap-3">
                    <span
                        class="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">02</span>
                    Informations Professionnelles
                </h2>

                <div class="space-y-10">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Département</label>
                            <input v-model="professionalInfo.departement" type="text"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Poste
                                Actuel</label>
                            <input v-model="professionalInfo.job_title" type="text"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Supérieur
                                Hiérarchique</label>
                            <input v-model="professionalInfo.superior" type="text"
                                class="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/30 text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all">
                        </div>
                    </div>

                    <div class="pt-8 border-t border-slate-50">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Historique des
                                Contrats</h3>
                            <button
                                @click.prevent="addEntry(contracts, { contract_type: 'CDD', start_date: '', work_location: '' })"
                                class="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all duration-300">
                                + Ajouter un contrat
                            </button>
                        </div>

                        <div class="overflow-x-auto rounded-2xl border border-slate-100">
                            <table class="w-full text-left">
                                <thead class="bg-slate-50 border-b border-slate-100">
                                    <tr class="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        <th class="px-6 py-4">Type de Contrat</th>
                                        <th class="px-6 py-4">Date Début</th>
                                        <th class="px-6 py-4">Date Fin</th>
                                        <th class="px-6 py-4">Lieu</th>
                                        <th class="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-50">
                                    <tr v-for="(c, idx) in contracts" :key="idx"
                                        class="group hover:bg-slate-50/50 transition-colors">
                                        <td class="px-6 py-3">
                                            <select v-model="c.contract_type"
                                                class="bg-transparent text-sm font-bold text-slate-700 focus:ring-0 border-none p-0 cursor-pointer outline-none">
                                                <option v-for="type in CONTRACT_TYPE_CHOICES" :key="type" :value="type">
                                                    {{ type }}</option>
                                            </select>
                                        </td>
                                        <td class="px-6 py-3 text-sm">
                                            <input v-model="c.start_date" type="date"
                                                class="bg-transparent border-none focus:ring-0 p-0 text-slate-600 outline-none">
                                        </td>
                                        <td class="px-6 py-3 text-sm">
                                            <input v-model="c.end_date" type="date"
                                                class="bg-transparent border-none focus:ring-0 p-0 text-slate-600 outline-none">
                                        </td>
                                        <td class="px-6 py-3 text-sm">
                                            <input v-model="c.work_location" placeholder="Site..."
                                                class="bg-transparent border-none focus:ring-0 p-0 text-slate-600 outline-none w-full placeholder-slate-300">
                                        </td>
                                        <td class="px-6 py-3 text-right">
                                            <button v-if="contracts.length > 1" @click="removeEntry(contracts, idx)"
                                                class="text-slate-300 hover:text-red-500 transition-colors">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section
                class="bg-white rounded-4xl p-8 md:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>

                <div class="flex items-center gap-4 mb-10">
                    <span
                        class="bg-amber-100 text-amber-700 w-10 h-10 rounded-xl flex items-center justify-center text-base font-black">03</span>
                    <h2 class="text-2xl font-black text-slate-800 uppercase tracking-tight">Parcours & Compétences</h2>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div class="space-y-8">
                        <div class="flex justify-between items-center border-b-2 border-slate-100 pb-4">
                            <span class="text-xs font-black text-slate-400 uppercase tracking-widest italic">Diplômes &
                                Études</span>
                            <button
                                @click.prevent="addEntry(degrees, { degree_name: '', institution: '', graduation_year: '' })"
                                class="text-blue-600 font-black text-xs uppercase hover:underline">+ Nouveau
                                Diplôme</button>
                        </div>

                        <div class="space-y-6">
                            <div v-for="(deg, idx) in degrees" :key="idx"
                                class="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4 relative group hover:border-blue-300 transition-all shadow-sm">

                                <div class="space-y-2">
                                    <label class="text-xs font-black text-slate-500 uppercase ml-1">Intitulé du
                                        diplôme</label>
                                    <input v-model="deg.degree_name" placeholder="Ex: Master en Informatique"
                                        class="w-full bg-white px-5 py-3 rounded-xl border-2 border-slate-100 text-base font-bold text-slate-800 outline-none focus:border-blue-500 transition-all">
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div class="md:col-span-2 space-y-2">
                                        <label
                                            class="text-xs font-black text-slate-500 uppercase ml-1">Établissement</label>
                                        <input v-model="deg.institution" placeholder="Université / École"
                                            class="w-full bg-white px-5 py-3 rounded-xl border-2 border-slate-100 text-sm text-slate-600 outline-none focus:border-blue-500 transition-all">
                                    </div>
                                    <div class="space-y-2">
                                        <label
                                            class="text-xs font-black text-slate-500 uppercase text-center block">Année</label>
                                        <input v-model="deg.graduation_year" placeholder="2024"
                                            class="w-full bg-white px-5 py-3 rounded-xl border-2 border-slate-100 text-sm font-mono text-center outline-none focus:border-blue-500 transition-all">
                                    </div>
                                </div>

                                <button v-if="degrees.length > 1" @click="removeEntry(degrees, idx)"
                                    class="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 shadow-md transition-all">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 18L18 6M6 6l12 12" stroke-width="3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <div class="flex justify-between items-center border-b-2 border-slate-100 pb-4">
                            <span class="text-xs font-black text-slate-400 uppercase tracking-widest italic">Maîtrise &
                                Skills</span>
                            <button @click.prevent="addEntry(skills, { skill_name: '', level: 'beginner' })"
                                class="text-blue-600 font-black text-xs uppercase hover:underline">+ Nouveau
                                Skill</button>
                        </div>

                        <div class="grid grid-cols-1 gap-4">
                            <div v-for="(sk, idx) in skills" :key="idx"
                                class="p-6 bg-white rounded-4xl border border-slate-100 flex items-center gap-6 shadow-sm group hover:border-blue-200 transition-all">

                                <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Compétence</label>
                                        <input v-model="sk.skill_name" placeholder="Ex: Java, Gestion de projet..."
                                            class="w-full bg-white px-5 py-3 rounded-xl border-2 border-slate-100 text-base font-bold text-slate-800 outline-none focus:border-blue-500 transition-all">
                                    </div>

                                    <div class="space-y-2 relative">
                                        <label
                                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Niveau
                                            de maîtrise</label>
                                        <div class="relative">
                                            <select v-model="sk.level"
                                                class="w-full bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 text-sm font-black uppercase text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer">
                                                <option v-for="level in LEVEL_SKILL_CHOICES" :key="level"
                                                    :value="level">
                                                    {{ level }}
                                                </option>
                                            </select>
                                            <div
                                                class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M19 9l-7 7-7-7" stroke-width="3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button v-if="skills.length > 1" @click="removeEntry(skills, idx)"
                                    class="self-end mb-1 text-slate-200 hover:text-red-500 transition-colors p-2">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7"
                                            stroke-width="2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-16 pt-10 border-t-2 border-slate-50">
                    <div class="flex justify-between items-center mb-8">
                        <span class="text-xs font-black text-slate-400 uppercase tracking-widest italic">Formations &
                            Certifications</span>
                        <button
                            @click.prevent="addEntry(trainings, { training_name: '', starts_on: '', ends_on: '', location: '' })"
                            class="px-6 py-3 bg-amber-50 text-amber-700 rounded-xl text-xs font-black uppercase hover:bg-amber-600 hover:text-white transition-all shadow-sm">
                            + Ajouter une Formation
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div v-for="(t, idx) in trainings" :key="idx"
                            class="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 relative group hover:bg-white hover:shadow-xl hover:border-amber-200 transition-all duration-300">

                            <div class="space-y-6">
                                <div class="space-y-2">
                                    <label class="text-xs font-black text-slate-500 uppercase ml-1">Nom du programme /
                                        Certification</label>
                                    <input v-model="t.training_name"
                                        placeholder="Ex: Certification AWS, Management d'équipe..."
                                        class="w-full bg-white px-5 py-3.5 rounded-xl border-2 border-slate-100 text-base font-bold text-slate-800 outline-none focus:border-amber-500 transition-all shadow-sm">
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-xs font-black text-emerald-600 uppercase ml-1">Date de
                                            début</label>
                                        <input v-model="t.starts_on" type="date"
                                            class="w-full bg-white px-5 py-3 rounded-xl border-2 border-slate-100 text-sm font-medium text-slate-600 outline-none focus:border-amber-500">
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-xs font-black text-slate-500 uppercase ml-1">Date de
                                            fin</label>
                                        <input v-model="t.ends_on" type="date"
                                            class="w-full bg-white px-5 py-3 rounded-xl border-2 border-slate-100 text-sm font-medium text-slate-600 outline-none focus:border-amber-500">
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label class="text-xs font-black text-slate-500 uppercase ml-1">Organisme ou
                                        Lieu</label>
                                    <input v-model="t.location" placeholder="Ex: Udemy, Antananarivo, Siège Social..."
                                        class="w-full bg-white px-5 py-3 rounded-xl border-2 border-slate-100 text-sm font-medium text-slate-500 outline-none focus:border-amber-500">
                                </div>
                            </div>

                            <button v-if="trainings.length > 1" @click="removeEntry(trainings, idx)"
                                class="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div class="sticky bottom-10 z-50 flex justify-center translate-y-2">
                <div
                    class="bg-white/90 backdrop-blur-md p-3 rounded-[2.5rem] border border-slate-200 shadow-2xl flex items-center gap-6">
                    <div class="px-6 hidden md:block">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validation Finale</p>
                        <p class="text-[11px] text-slate-600 font-medium">Enregistrement sécurisé AIKA</p>
                    </div>
                    <button type="submit"
                        class="bg-blue-600 hover:bg-emerald-600 text-white px-12 py-4 rounded-4xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all duration-500 flex items-center gap-4 group">
                        Sauvegarder mon dossier
                        <svg class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-width="3" />
                        </svg>
                    </button>
                </div>
            </div>

        </form>
    </div>
</template>