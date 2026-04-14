import type { AuthorizationRequest } from "@/types/Authorization";
import { http } from "./http";
import { STATUS_CHOICES } from "@/enums/choices";

const AuthorizationService = {
    all: async (): Promise<AuthorizationRequest[]> => {
        const response = await http.get('/authorizationrequest/');
        return response.data;
    },
    get: async (id: number): Promise<AuthorizationRequest> => {
        const response = await http.get(`/authorizationrequest/${id}/`);
        return response.data;
    },
    post: async (authorization: AuthorizationRequest): Promise<AuthorizationRequest> => {
        const response = await http.post('/authorizationrequest/', authorization);
        return response.data;
    },
    put: async (authorization: AuthorizationRequest, id: number): Promise<AuthorizationRequest> => {
        const response = await http.put(`/authorizationrequest/${id}/`);
        return response.data;
    },
    delete: async (id: number) => {
        await http.delete(`/authorizationrequest/${id}/`);
    },
    getEmployeeAuthorizations: async (matricule:string): Promise<AuthorizationRequest[]> => {
            const response = await http.get(`/authorizationrequest/?employee=${matricule}`);
            return response.data
    },
    acceptAuhtorization: async (id: number): Promise<AuthorizationRequest> => {
        const response = await http.patch(`/authorizationrequest/${id}/`, {validation_status : STATUS_CHOICES.ACCEPTED});
        return response.data;
    },
    rejectAuhtorization: async (id: number): Promise<AuthorizationRequest> => {
        const response = await http.patch(`/authorizationrequest/${id}/`, {validation_status : STATUS_CHOICES.REJECTED});
        return response.data;
    },
    cancelAuhtorization: async (id: number): Promise<AuthorizationRequest> => {
        const response = await http.patch(`/authorizationrequest/${id}/`, {validation_status : STATUS_CHOICES.CANCELED});
        return response.data;
    },
    getPendingAuthorizations: async (): Promise<AuthorizationRequest[]> => {
        const response = await http.get(`/authorizationrequest/?validation_status=PENDING`);
        return response.data;
    }
}

export default AuthorizationService;