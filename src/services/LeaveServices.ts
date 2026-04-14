import type { Leave } from "@/types/Leave";
import { http } from "./http";
import { STATUS_CHOICES } from "@/enums/choices";

const LeaveServices = {
    all: async (): Promise<Leave[]> => {
        const response = await http.get('/leave/');
        return response.data;
    },
    get: async (id: number): Promise<Leave> => {
        const response = await http.get(`/leave/${id}/`)
        return response.data;
    },
    post: async (leave: Leave): Promise<Leave> => {
        const response = await http.post(`/leave/`, leave);
        return response.data;
    },
    put: async (leave: Leave, id: number): Promise<Leave> => {
        const response = await http.put(`/leave/${id}/`, leave);
        return response.data;
    },
    delete: async (id:number) => {
        await http.delete(`/leave/${id}/`);
    },
    getEmployeeLeaves: async (matricule:string): Promise<Leave[]> => {
        const response = await http.get(`/leave/?employee=${matricule}`);
        return response.data
    },
    acceptLeave: async (id: number): Promise<Leave> => {
        const response = await http.patch(`/leave/${id}/`, {validation_status : STATUS_CHOICES.ACCEPTED});
        return response.data;
    },
    rejectLeave: async (id: number): Promise<Leave> => {
        const response = await http.patch(`/leave/${id}/`, {validation_status : STATUS_CHOICES.REJECTED});
        return response.data;
    },
    cancelLeave: async (id: number): Promise<Leave> => {
        const response = await http.patch(`/leave/${id}/`, {validation_status : STATUS_CHOICES.CANCELED});
        return response.data;
    },
    getPendingLeaves: async (): Promise<Leave[]> => {
        const response = await http.get(`/leave/?validation_status=PENDING`);
        return response.data
    }
}

export default LeaveServices;