import type { CONTRACT_TYPE_CHOICES, GENDER_CHOICES, MARITAL_STATUS_CHOICES } from "@/enums/choices";

export interface Employee {
    matricule: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface EmployeeChecker {
    matricule: string;
}

export interface PersonalInfo {
    id?: number;
    employee: string;
    birth_date: string;
    birth_place: string;
    gender: GENDER_CHOICES;
    nationality: string;
    marital_status: MARITAL_STATUS_CHOICES;
    child_count?: number;
}

export interface Coordinate  {
    id?: number;
    employee: string;
    phone_number: string;
    home_address: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
}

export interface Administrative {
    id?: number;
    employee: string;
    cin_number: string;
    cin_issue_date: string;
    cin_issue_place: string;
    passport_number?: string;
    passport_issue_date?: string;
    passport_issue_place?: string;
    nif: string;
    stat: string;
}

export interface ProfessionalInfo {
    id?: number;
    employee: string;
    department: string;
    job_title: string;
    superior?: string;
}

export interface Contract {
    id?: number;
    employee: string;
    contract_type: CONTRACT_TYPE_CHOICES;
    contract_start: string;
    contract_end?: string | null;
    work_location: string;
}

export interface BankInfo {
    id?: number;
    employee: string;
    payment_method?: string;
    bank_name: string;
    rib: string;
    account_number:string;
    code_guichet: string;
    code_bank: string;
}

export interface Degree {
    id?: number;
    employee: string;
    degree_name: string;
    institution: string;
    graduation_year?: string;
}

export interface Training {
    id?: number;
    employee: string;
    training_name: string;
    starts_on: string;
    ends_on?: string;
    location?: string;
}

export interface Skill {
    id?: number;
    employee: string;
    skill_name: string;
    level: string;
    description?: string;
}

export interface CompleteEmployee extends Employee {
    personal_info?: PersonalInfo | null;
    administrative_info?: Administrative | null;
    bank_info?: BankInfo | null;
    professional_info?: ProfessionalInfo | null;
    coordinates?: Coordinate | null;
    degrees?: Degree[];
    skills?: Skill[];
    trainings?: Training[];
    contracts?: Contract[];
}

export interface CompleteEmployeePayload {
    last_name?: string;
    first_name?: string;
    email?: string;
    personal_info?: Omit<PersonalInfo, 'id' | 'employee'> | null;
    administrative_info?: Omit<Administrative, 'id' | 'employee'> | null;
    bank_info?: Omit<BankInfo, 'id' | 'employee'> | null;
    professional_info?: Omit<ProfessionalInfo, 'id' | 'employee'> | null;
    coordinates?: Omit<Coordinate, 'id' | 'employee'> | null;
    degrees?: Array<Omit<Degree, 'id' | 'employee'>>;
    skills?: Array<Omit<Skill, 'id' | 'employee'>>;
    trainings?: Array<Omit<Training, 'id' | 'employee'>>;
    contracts?: Array<Omit<Contract, 'id' | 'employee'>>;
}

