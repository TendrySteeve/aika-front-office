import type { Permission } from "@/types/Pemission";
import { http } from "./http";
import { STATUS_CHOICES } from "@/enums/choices";

const PermissionServices = {
    all: async (): Promise<Permission[]> => {
        const response = await http.get('/permissionrequest/');
        return response.data;
    },
    get: async (id: number): Promise<Permission> => {
        const response = await http.get(`/permissionrequest/${id}/`);
        return response.data;
    },
    post: async (permission: Permission): Promise<Permission> => {
        const response = await http.post('/permissionrequest/', permission);
        return response.data
    },
    put: async (permission: Permission, id: number): Promise<Permission> => {
        const response = await http.put(`/permissionrequest/${id}/`, permission);
        return response.data;
    },
    delete: async (id: number) => {
        await http.delete(`/permissionrequest/${id}/`)
    },
    getEmployeePermissions: async (matricule:string): Promise<Permission[]> => {
        const response = await http.get(`/permissionrequest/?employee=${matricule}`);
        return response.data
    },
    acceptPermission: async (id: number): Promise<Permission> => {
        const response = await http.patch(`/permissionrequest/${id}/`, {validation_status : STATUS_CHOICES.ACCEPTED});
        return response.data;
    },
    rejectPermission: async (id: number): Promise<Permission> => {
        const response = await http.patch(`/permissionrequest/${id}/`, {validation_status : STATUS_CHOICES.REJECTED});
        return response.data;
    },
    cancelPermission: async (id: number): Promise<Permission> => {
        const response = await http.patch(`/permissionrequest/${id}/`, {validation_status : STATUS_CHOICES.CANCELED});
        return response.data;
    },
    getPendingPermissions: async (): Promise<Permission[]> => {
        const response = await http.get(`/permissionrequest/?validation_status=PENDING`);
        return response.data
    }
}

export default PermissionServices;