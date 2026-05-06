<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Mission } from '@/types/Mission';

const missions = ref<Mission[]>([]);
const employee = ref<string>('');

const missionOnCreate = ref<Partial<Mission>>({});

const createMission = async () => {
    missionOnCreate.value = {
        ...missionOnCreate.value,
        employee: employee.value
    };

    try {
        
    } catch (error) {
        console.error(error);
    }
};

const deleteMission = async (id?: number) => {
    if (!id) return;
    try {
        
    } catch (error) {
        console.error(error);
    }
};

// onMounted(fetchEmployeeMissions);
</script>

<template>
    
</template>