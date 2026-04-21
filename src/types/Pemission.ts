import type { PERIOD_CHOICES, STATUS_CHOICES } from "@/enums/choices";

export interface Permission {
    id?: number;
    employee: string;
    date_request: string;
    permission_start: string;
    permission_end:string;
    start_period: PERIOD_CHOICES;
    end_period: PERIOD_CHOICES;
    duration: number;
    reason: string;
    validation_status: STATUS_CHOICES;
}