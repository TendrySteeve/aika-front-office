<script setup lang="ts">
import type { User } from '@/types/User';



const form = defineModel<User>({ required: true })

withDefaults(
    defineProps<{
        loading?: boolean
        submitLabel: string
        roleOptions: { label: string; value: string; isActive: boolean }[]
    }>(),
    {
        loading: false,
    },
)

const emit = defineEmits<{
    submit: []
    'select-role': [role: string]
}>()
</script>

<template>
    <form class="space-y-8" @submit.prevent="emit('submit')">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="space-y-2">
                <label class="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Matricule
                </label>
                <input v-model="form.matricule" required type="text" placeholder="Matricule de l'utilisateur"
                    class="w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500" />
            </div>
            <div class="space-y-2">
                <label class="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Adresse email
                </label>
                <input v-model="form.email" required type="email"
                    class="w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500" />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="space-y-2">
                <label class="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Prénom
                </label>
                <input v-model="form.first_name" required type="text" placeholder="Prénom"
                    class="w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500" />
            </div>
            <div class="space-y-2">
                <label class="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Nom
                </label>
                <input v-model="form.last_name" required type="text" placeholder="Nom"
                    class="w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500" />
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <h4 class="text-sm font-medium text-slate-400">Rôle de l'utilisateur</h4>
            <div class="flex flex-wrap gap-2">
                <button v-for="role in roleOptions" :key="role.value" type="button"
                    @click="emit('select-role', role.value)"
                    class="rounded-full px-6 py-2 text-sm font-semibold transition-all duration-100" :class="role.isActive ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-zinc-500 shadow-sm'
                        ">
                    {{ role.label }}
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label class="inline-flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
                <input v-model="form.is_staff" type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span class="text-sm font-medium text-slate-700">Accès administrateur</span>
            </label>
            <label class="inline-flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
                <input v-model="form.is_active" type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span class="text-sm font-medium text-slate-700">Compte actif</span>
            </label>
        </div>

        <button type="submit"
            class="flex w-full justify-center rounded-full bg-blue-600 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="loading">
            <div v-if="loading" class="h-6 w-6 animate-spin rounded-full border-s-2 border-white"></div>
            <span v-else>{{ submitLabel }}</span>
        </button>
    </form>
</template>
