import type { Telework } from "@/types/Telework";
import { http } from "./http";

const TeleworkService = {
    all: async (): Promise<Telework[]> => {
        const response = await http.get('/telework/');
        return response.data
    },
    get: async (id: number): Promise<Telework> => {
        const response = await http.get(`/telework/${id}/`);
        return response.data;
    },
    post: async (telework: Telework): Promise<Telework> => {
        const response = await http.post('/telework/', telework);
        return response.data;
    },
    put: async (telework: Telework, id: number): Promise<Telework> => {
        const response = await http.put(`/telework/${id}/`, telework);
        return response.data;
    },
    delete: async (id: number) => {
        await http.delete(`/telework/${id}/`);
    }
}

export default TeleworkService