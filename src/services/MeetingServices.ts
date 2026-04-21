import type { Meeting } from "@/types/Meeting";
import { http } from "./http";

const MeetingService = {
    all: async (): Promise<Meeting[]> => {
        const response = await http.get('/meeting/');
        return response.data
    },
    get: async (id: number): Promise<Meeting> => {
        const response = await http.get(`/meeting/${id}/`);
        return response.data;
    },
    post: async (meeting: Meeting): Promise<Meeting> => {
        const response = await http.post('/meeting/', meeting);
        return response.data;
    },
    put: async (meeting: Meeting, id: number): Promise<Meeting> => {
        const response = await http.put(`/meeting/${id}/`, meeting);
        return response.data;
    },
    delete: async (id: number) => {
        await http.delete(`/meeting/${id}/`);
    },
    getEmployeeMeetings: async (matricule: string): Promise<Meeting[]> => {
        const response = await http.get(`/meeting/?employee=${matricule}`);
        return response.data;
    }
}

export default MeetingService