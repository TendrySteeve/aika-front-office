import type { Administrative, BankInfo, Contract, Coordinate, Degree, PersonalInfo, ProfessionalInfo, Skill, Training } from '@/types/Employee'
import { http } from './http'

export const emmployeeApi = {
  checkEmployeeExists: async (matricule: string) => {
    return await http.post('employee/index/check-employee/', { matricule: matricule })
  },
  fetchEmployeeData: async (matricule: string) => {
    return await http.get(`employee/index/${matricule}/`)
  },
}

export const personalInfoApi = {
  getPersonalInfo: async (employee: string) => {
    return await http.get(`employee/personal/?employee=${employee}`)
  },
  createPersonalInfo: async (payload: PersonalInfo) => {
    return await http.post('employee/personal/', payload)
  },
  updatePersonalInfo: async (payload: PersonalInfo) => {
    return await http.put(`employee/personal/${payload.id}/`, payload)
  },
}

export const coordinateApi = {
  getCoordinate: async (employee: string) => {
    return await http.get(`employee/coordinate/?employee=${employee}`)
  },
  createCoordinate: async (payload: Coordinate) => {
    return await http.post('employee/coordinate/', payload)
  },
  updateCoordinate: async (payload: Coordinate) => {
    return await http.put(`employee/coordinate/${payload.id}/`, payload)
  },
}

export const administrativeApi = {
  getAdministrative: async (employee: string) => {
    return await http.get(`employee/administrative/?employee=${employee}`)
  },
  createAdministrative: async (payload: Administrative) => {
    return await http.post('employee/administrative/', payload)
  },
  updateAdministrative: async (payload: Administrative) => {
    return await http.put(`employee/administrative/${payload.id}/`, payload)
  },
}

export const professionalInfoApi = {
  getProfessionalInfo: async (employee: string) => {
    return await http.get(`employee/professional/?employee=${employee}`)
  },
  createProfessionalInfo: async (payload: ProfessionalInfo) => {
    return await http.post('employee/professional/', payload)
  },
  updateProfessionalInfo: async (payload: ProfessionalInfo) => {
    return await http.put(`employee/professional/${payload.id}/`, payload)
  },
}

export const contractApi = {
  getContract: async (employee: string) => {
    return await http.get(`employee/contract/?employee=${employee}`)
  },
  createContract: async (payload: Contract) => {
    return await http.post('employee/contract/', payload)
  },
  updateContract: async (payload: Contract) => {
    return await http.put(`employee/contract/${payload.id}/`, payload)
  },
}

export const bankInfoApi = {
  getBankInfo: async (employee: string) => {
    return await http.get(`employee/bank/?employee=${employee}`)
  },
  createBankInfo: async (payload: BankInfo) => {
    return await http.post('employee/bank/', payload)
  },
  updateBankInfo: async (payload: BankInfo) => {
    return await http.put(`employee/bank/${payload.id}/`, payload)
  },
}

export const degreeApi = {
  getDegrees: async (employee: string) => {
    return await http.get(`employee/degree/?employee=${employee}`)
  },
  createDegree: async (payload: Degree) => {
    return await http.post('employee/degree/', payload)
  },
  updateDegree: async (payload: Degree) => {
    return await http.put(`employee/degree/${payload.id}/`, payload)
  },
}

export const trainingApi = {
  getTrainings: async (employee: string) => {
    return await http.get(`employee/training/?employee=${employee}`)
  },
  createTraining: async (payload: Training) => {
    return await http.post('employee/training/', payload)
  },
  updateTraining: async (payload: Training) => {
    return await http.put(`employee/training/${payload.id}/`, payload)
  },
}

export const skillApi = {
  getSkills: async (employee: string) => {
    return await http.get(`employee/skill/?employee=${employee}`)
  },
  createSkill: async (payload: Skill) => {
    return await http.post('employee/skill/', payload)
  },
  updateSkill: async (payload: Skill) => {
    return await http.put(`employee/skill/${payload.id}/`, payload)
  },
}
