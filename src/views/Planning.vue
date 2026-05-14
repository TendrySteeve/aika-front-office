<script setup lang="ts">
import { onMounted, ref } from 'vue'

import FullCalendar from '@fullcalendar/vue3'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

import type {
    CalendarOptions,
    EventClickArg,
} from '@fullcalendar/core'
import PlanningService from '@/services/PlanningServices'

const calendarRef = ref()

const selectedEvent = ref<any>(null)

const calendarOptions = ref<CalendarOptions>({
    plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin,
    ],

    initialView: 'dayGridMonth',

    locale: 'fr',

    height: 'auto',

    selectable: true,

    editable: false,

    weekends: true,

    nowIndicator: true,

    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right:
            'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },

    buttonText: {
        today: "Aujourd'hui",
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste',
    },

    events: async (fetchInfo, successCallback, failureCallback) => {
        try {
            const data = await PlanningService.get();
            console.log(data)
            successCallback(data)
        } catch (error) {
            console.error(error)
            failureCallback(error as Error)
        }
    },

    eventClick(info: EventClickArg) {
        selectedEvent.value = info.event
    },

    eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
    },
})

const formatDate = (date: Date | null) => {
    if (!date) return '-'

    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
    }).format(date)
}

onMounted(() => {
    console.log('Calendar mounted')
})
</script>
<template>
    <div class="calendar-page">
        <div class="calendar-container">
            <FullCalendar ref="calendarRef" :options="calendarOptions">
                <template #eventContent="arg">
                    <div class="event-content">
                        <div class="event-title">
                            {{ arg.event.title }}
                        </div>

                        <div class="event-employee">
                            {{
                                arg.event.extendedProps.employee?.fullName ||
                                'Employé inconnu'
                            }}
                        </div>
                    </div>
                </template>
            </FullCalendar>
        </div>

        <!-- Modal -->
        <div v-if="selectedEvent" class="modal-overlay" @click="selectedEvent = null">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h2>{{ selectedEvent.title }}</h2>
                    <button class="close-btn" @click="selectedEvent = null">
                        ✕
                    </button>
                </div>
                <div class="modal-body">
                    <div class="detail-item">
                        <span class="label">Type :</span>
                        <span>{{ selectedEvent.extendedProps.type }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Employé :</span>
                        <span>
                            {{
                                selectedEvent.extendedProps.employee?.fullName ||
                                'Inconnu'
                            }}
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Matricule :</span>
                        <span>
                            {{
                                selectedEvent.extendedProps.employee?.matricule ||
                                '-'
                            }}
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Début :</span>
                        <span>{{ formatDate(selectedEvent.start) }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Fin :</span>
                        <span>{{ formatDate(selectedEvent.end) }}</span>
                    </div>
                    <!-- LEAVE / PERMISSION -->
                    <template v-if="selectedEvent.extendedProps.start_period">
                        <div class="detail-item">
                            <span class="label">Période début :</span>
                            <span>
                                {{ selectedEvent.extendedProps.start_period }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Période fin :</span>
                            <span>
                                {{ selectedEvent.extendedProps.end_period }}
                            </span>
                        </div>
                    </template>
                    <!-- AUTHORIZATION -->
                    <template v-if="selectedEvent.extendedProps.departure_time">
                        <div class="detail-item">
                            <span class="label">Heure départ :</span>
                            <span>
                                {{ selectedEvent.extendedProps.departure_time }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Heure retour :</span>
                            <span>
                                {{ selectedEvent.extendedProps.return_time }}
                            </span>
                        </div>
                    </template>
                    <!-- REASON -->
                    <template v-if="selectedEvent.extendedProps.reason">
                        <div class="detail-item">
                            <span class="label">Raison :</span>
                            <span>
                                {{ selectedEvent.extendedProps.reason }}
                            </span>
                        </div>
                    </template>
                    <!-- MISSION -->
                    <template v-if="selectedEvent.extendedProps.project">
                        <div class="detail-item">
                            <span class="label">Projet :</span>
                            <span>
                                {{ selectedEvent.extendedProps.project }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Activité :</span>
                            <span>
                                {{ selectedEvent.extendedProps.activity }}
                            </span>
                        </div>
                    </template>
                    <!-- MEETING -->
                    <template v-if="selectedEvent.extendedProps.subject">
                        <div class="detail-item">
                            <span class="label">Sujet :</span>
                            <span>
                                {{ selectedEvent.extendedProps.subject }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Lieu :</span>
                            <span>
                                {{ selectedEvent.extendedProps.location }}
                            </span>
                        </div>
                    </template>
                    <!-- TELEWORK -->
                    <template v-if="selectedEvent.extendedProps.type === 'TELEWORK'">
                        <div class="detail-item">
                            <span class="label">Lieu :</span>
                            <span>
                                {{ selectedEvent.extendedProps.location }}
                            </span>
                        </div>
                    </template>
                    <!-- RECOVERY -->
                    <template v-if="selectedEvent.extendedProps.detail">
                        <div class="detail-item">
                            <span class="label">Détail :</span>
                            <span>
                                {{ selectedEvent.extendedProps.detail }}
                            </span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

.calendar-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.event-content {
    padding: 2px;
}

.event-title {
    font-size: 12px;
    font-weight: 600;
}

.event-employee {
    font-size: 11px;
    opacity: 0.9;
}

/* Modal */

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 9999;
}

.modal-content {
    width: 500px;
    max-width: 95%;

    background: white;
    border-radius: 12px;

    overflow: hidden;
}

.modal-header {
    padding: 16px 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid #e5e7eb;
}

.modal-body {
    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 12px;
}

.close-btn {
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.label {
    font-weight: 700;
    color: #374151;
}

/* Fullcalendar */

:deep(.fc) {
    font-family: Arial, sans-serif;
}

:deep(.fc-toolbar-title) {
    font-size: 20px;
    font-weight: 700;
}

:deep(.fc-button) {
    border-radius: 6px !important;
}

:deep(.fc-event) {
    border: none;
    padding: 2px;
    cursor: pointer;
}
</style>