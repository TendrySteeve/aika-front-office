import { STATUS_CHOICES } from "@/enums/choices";

export const getStatusStyle = (status: STATUS_CHOICES) => {
    switch (status) {
        case STATUS_CHOICES.PENDING: return 'bg-amber-100 text-amber-700 border-amber-200';
        case STATUS_CHOICES.ACCEPTED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case STATUS_CHOICES.REJECTED: return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
};