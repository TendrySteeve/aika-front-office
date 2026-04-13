import type { Permission } from "@/types/Pemission";
import { http } from "./http";

const PermissionServices = {
    all: async (): Promise<Permission[]> => {
        const response = await http.get('/permisstionrequest/');
        return response.data;
    },
    get: async (id: number): Promise<Permission> => {
        const response = await http.get(`/permisstionrequest/${id}/`);
        return response.data;
    },
    post: async (permission: Permission): Promise<Permission> => {
        const response = await http.post('/permisstionrequest/', permission);
        return response.data
    },
    put: async (permission: Permission, id: number): Promise<Permission> => {
        const response = await http.put(`/permisstionrequest/${id}/`, permission);
        return response.data;
    },
    delete: async (id: number) => {
        await http.delete(`/permisstionrequest/${id}/`)
    }
}

export default PermissionServices;