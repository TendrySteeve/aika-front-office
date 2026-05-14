import type { CONTRACT_TYPE_CHOICES, SEX_CHOICES, MARITAL_STATUS_CHOICES } from '@/enums/choices'

export interface Employee {
  matricule: string
  first_name: string
  last_name: string
  birth_date: string
  birth_place: string
  user?: number
  sex: SEX_CHOICES
  nationality: string
  marital_status: MARITAL_STATUS_CHOICES
  child_count?: number
}

export interface Coordinate {
  id?: number
  employee: string
  phone_number: string
  email: string
  home_address: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
}

export interface Administrative {
  id?: number
  employee: string
  cin_number: string
  cin_issue_date: string
  cin_issue_place: string
  passport_number?: string
  passport_issue_date?: string
  passport_issue_place?: string
  nif: string
  stat: string
}

export interface Professional {
  id?: number
  employee: string
  departement: string
  job_title: string
  superior?: string
}

export interface Contract {
  id?: number
  employee: string
  contract_type: CONTRACT_TYPE_CHOICES
  contract_start: string
  contract_end?: string
  work_location: string
}

export interface Bank {
  id?: number
  payment_method: string
  employee: string
  bank_name: string
  rib: string
  account_number: string
  code_guichet: string
  code_bank: string
}

export interface Degree {
  id?: number
  employee: string
  degree_name: string
  institution: string
  graduation_year?: string
}

export interface Education {
  id?: number
  employee: string
  level: string
  institution: string
}

export interface Skill {
  id?: number
  employee: string
  skill_name: string
  level: string
  description?: string
}

export interface EmployeeComplet {
  matricule: string
  user?: number
  last_name: string
  first_name: string
  birth_date: string
  birth_place: string
  sex: SEX_CHOICES
  nationality: string
  marital_status: MARITAL_STATUS_CHOICES
  child_count?: number
  created_at: string
  updated_at: string
  administrative?: Administrative
  bank?: Bank
  professional?: Professional
  coordinate?: Coordinate
  contracts?: Contract[]
  degrees?: Degree[]
  educations?: Education[]
  skills?: Skill[]
}
