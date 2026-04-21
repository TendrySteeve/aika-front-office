import type { Mission } from "@/types/Mission";
import { http } from "./http";

const MissionService = {
    all: async (): Promise<Mission[]> => {
        const response = await http.get('/mission/');
        return response.data
    },
    get: async (id: number): Promise<Mission> => {
        const response = await http.get(`/mission/${id}/`);
        return response.data;
    },
    post: async (mission: Mission): Promise<Mission> => {
        const response = await http.post('/mission/', mission);
        return response.data;
    },
    put: async (mission: Mission, id: number): Promise<Mission> => {
        const response = await http.put(`/mission/${id}/`, mission);
        return response.data;
    },
    delete: async (id: number) => {
        await http.delete(`/mission/${id}/`);
    },
    getEmployeeMissions: async (matricule: string): Promise<Mission[]> => {
        const response = await http.get(`/mission/?employee=${matricule}`);
        return response.data;
    }
}

export default MissionService