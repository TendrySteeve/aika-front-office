export interface User {
  id?: number;
  matricule: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_staff: boolean;
  is_active: boolean;
  password?: string;
}

export interface UserAuthenticated {
  id?: number;
  matricule: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}