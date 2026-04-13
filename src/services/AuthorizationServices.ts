import type { AuthorizationRequest } from "@/types/Authorization";
import { http } from "./http";

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
        }
}

export default AuthorizationService;