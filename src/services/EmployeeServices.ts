import type {
  Administrative,
  Bank,
  Contract,
  Coordinate,
  Degree,
  Education,
  Employee,
  EmployeeComplet,
  Professional,
  Skill,
} from '@/types/Employee'
import { http } from './http'

type EmployeeNestedResource =
  | Administrative
  | Bank
  | Contract
  | Coordinate
  | Degree
  | Education
  | Professional
  | Skill

type EmployeeNestedService<T extends EmployeeNestedResource> = {
  all: (matricule: string) => Promise<T[]>
  get: (matricule: string, pk: number) => Promise<T>
  post: (matricule: string, payload: T) => Promise<T>
  put: (matricule: string, pk: number, payload: T) => Promise<T>
  patch: (matricule: string, pk: number, payload: Partial<T>) => Promise<T>
  delete: (matricule: string, pk: number) => Promise<void>
}

type PaginatedEmployees = {
  count: number
  next?: string
  previous?: string
  results: EmployeeComplet[]
}

const createNestedService = <T extends EmployeeNestedResource>(
  resource: string,
): EmployeeNestedService<T> => ({
  all: async (matricule: string): Promise<T[]> => {
    const response = await http.get(`/api/employee/${matricule}/${resource}/`)
    return response.data
  },
  get: async (matricule: string, pk: number): Promise<T> => {
    const response = await http.get(`/api/employee/${matricule}/${resource}/${pk}/`)
    return response.data
  },
  post: async (matricule: string, payload: T): Promise<T> => {
    const response = await http.post(`/api/employee/${matricule}/${resource}/`, payload)
    return response.data
  },
  put: async (matricule: string, pk: number, payload: T): Promise<T> => {
    const response = await http.put(`/api/employee/${matricule}/${resource}/${pk}/`, payload)
    return response.data
  },
  patch: async (matricule: string, pk: number, payload: Partial<T>): Promise<T> => {
    const response = await http.patch(`/api/employee/${matricule}/${resource}/${pk}/`, payload)
    return response.data
  },
  delete: async (matricule: string, pk: number): Promise<void> => {
    await http.delete(`/api/employee/${matricule}/${resource}/${pk}/`)
  },
})

const EmployeeService = {
  all: async (
    itemsPerPage: number,
    offset: number,
  ): Promise<EmployeeComplet[] | PaginatedEmployees> => {
    const response = await http.get(`/api/employee/?limit=${itemsPerPage}&offset=${offset}`)
    return response.data
  },
  get: async (matricule: string): Promise<EmployeeComplet> => {
    const response = await http.get(`/api/employee/${matricule}/`)
    return response.data
  },
  post: async (employee: Employee): Promise<Employee> => {
    const response = await http.post('/api/employee/', employee)
    return response.data
  },
  put: async (employee: Employee, matricule: string): Promise<Employee> => {
    const response = await http.put(`/api/employee/${matricule}/`, employee)
    return response.data
  },
  patch: async (employee: Partial<Employee>, matricule: string): Promise<Employee> => {
    const response = await http.patch(`/api/employee/${matricule}/`, employee)
    return response.data
  },
  delete: async (matricule: string): Promise<void> => {
    await http.delete(`/api/employee/${matricule}/`)
  },
  professional: createNestedService<Professional>('professional'),
  administrative: createNestedService<Administrative>('administrative'),
  bank: createNestedService<Bank>('bank'),
  contract: createNestedService<Contract>('contract'),
  coordinate: createNestedService<Coordinate>('coordinate'),
  degree: createNestedService<Degree>('degree'),
  education: createNestedService<Education>('education'),
  skill: createNestedService<Skill>('skill'),
}

export default EmployeeService
