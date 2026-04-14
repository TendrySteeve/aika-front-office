import type { STATUS_CHOICES } from "@/enums/choices";

export interface AuthorizationRequest {
    id?: number;
    employee: string;
    date_request: string;
    reason: string;
    validation_status: STATUS_CHOICES,
    departure_time: string;
    return_time:string;
    duration: number;
}