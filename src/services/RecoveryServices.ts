import type { Recovery } from "@/types/Recovery";
import { http } from "./http";

const RecoveryServices = {
    all: async (): Promise<Recovery[]> => {
        const response = await http.get('/recovery/');
        return response.data;
    },
    get: async (id: number): Promise<Recovery> => {
        const response = await http.get(`/recovery/${id}/`);
        return response.data;
    },
    post: async (recovery: Recovery): Promise<Recovery> => {
        const response = await http.post('/recovery/', recovery);
        return response.data;
    },
    put: async (recovery: Recovery, id: number): Promise<Recovery> => {
        const response = await http.put(`/recovery/${id}/`, recovery);
        return response.data;
    },
    delete: async (id: number) => {
        await http.delete(`/recovery/${id}/`);
    },
}

export default RecoveryServices;