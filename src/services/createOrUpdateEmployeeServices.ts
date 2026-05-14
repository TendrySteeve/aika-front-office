import type {
  Administrative,
  Bank,
  Contract,
  Coordinate,
  Degree,
  Education,
  Employee,
  Professional,
  Skill,
} from '@/types/Employee'
import EmployeeService from './EmployeeServices'
import { logError } from '@/utils/logger'

const withEmployee = <T extends { employee: string }>(payload: T, matricule: string): T => ({
  ...payload,
  employee: matricule,
})

const saveNestedResource = async <T extends { id?: number; employee: string }>(
  matricule: string,
  payload: T,
  service: {
    post: (matricule: string, payload: T) => Promise<T>
    put: (matricule: string, pk: number, payload: T) => Promise<T>
  },
) => {
  const payloadWithEmployee = withEmployee(payload, matricule)

  if (payload.id !== undefined) {
    return service.put(matricule, payload.id, payloadWithEmployee)
  }

  return service.post(matricule, payloadWithEmployee)
}
export const createOrUpdateEmployee = async (
  employee: Employee,
  professional: Professional,
  administrative: Administrative,
  bank: Bank,
  coordinate: Coordinate,
  contracts: Contract[],
  degrees: Degree[],
  educations: Education[],
  skills: Skill[],
) => {
  try {
    let matricule = employee.matricule
    let savedEmployee: Employee

    // 🔥 1. CREATE ou UPDATE
    let exists = false

    try {
      await EmployeeService.get(matricule)
      exists = true
    } catch (error) {
      exists = false
    }

    // 🔥 CREATE ou UPDATE
    if (exists) {
      savedEmployee = await EmployeeService.put(employee, matricule)
    } else {
      savedEmployee = await EmployeeService.post(employee)
    }

    const promises: Promise<any>[] = []

    // 🔥 2. Nested resources (logique unifiée avec saveNestedResource)

    if (professional.departement || professional.job_title || professional.superior) {
      promises.push(saveNestedResource(matricule, professional, EmployeeService.professional))
    }

    if (
      administrative.cin_number ||
      administrative.passport_number ||
      administrative.nif ||
      administrative.stat
    ) {
      promises.push(saveNestedResource(matricule, administrative, EmployeeService.administrative))
    }

    if (bank.payment_method || bank.bank_name || bank.account_number) {
      promises.push(saveNestedResource(matricule, bank, EmployeeService.bank))
    }

    if (coordinate.phone_number || coordinate.email || coordinate.home_address) {
      promises.push(saveNestedResource(matricule, coordinate, EmployeeService.coordinate))
    }

    contracts.forEach((contract) => {
      if (contract.contract_type && contract.contract_start && contract.work_location) {
        promises.push(saveNestedResource(matricule, contract, EmployeeService.contract))
      }
    })

    degrees.forEach((degree) => {
      if (degree.degree_name) {
        promises.push(saveNestedResource(matricule, degree, EmployeeService.degree))
      }
    })

    educations.forEach((edu) => {
      if (edu.level) {
        promises.push(saveNestedResource(matricule, edu, EmployeeService.education))
      }
    })

    skills.forEach((skill) => {
      if (skill.skill_name) {
        promises.push(saveNestedResource(matricule, skill, EmployeeService.skill))
      }
    })

    await Promise.all(promises)

    return savedEmployee
  } catch (error) {
    logError('employee.create_or_update', error)
    throw error
  }
}
