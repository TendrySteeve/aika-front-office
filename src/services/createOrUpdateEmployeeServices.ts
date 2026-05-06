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

export const create_Employee = async (
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
    const createdEmployee = await EmployeeService.post(employee)
    const matricule = createdEmployee.matricule

    if (!matricule) {
      throw new Error('Matricule is missing')
    }
    const promises: Promise<any>[] = []

    if (professional.departement) {
      promises.push(
        EmployeeService.professional.post(matricule, withEmployee(professional, matricule)),
      )
    }

    if (administrative.cin_number) {
      promises.push(
        EmployeeService.administrative.post(matricule, withEmployee(administrative, matricule)),
      )
    }

    if (bank.account_number) {
      promises.push(EmployeeService.bank.post(matricule, withEmployee(bank, matricule)))
    }

    if (coordinate.phone_number) {
      promises.push(EmployeeService.coordinate.post(matricule, withEmployee(coordinate, matricule)))
    }

    contracts.forEach((contract) => {
      if (contract.contract_type && contract.contract_start && contract.work_location) {
        promises.push(EmployeeService.contract.post(matricule, withEmployee(contract, matricule)))
      }
    })

    degrees.forEach((degree) => {
      if (degree.degree_name) {
        promises.push(EmployeeService.degree.post(matricule, withEmployee(degree, matricule)))
      }
    })

    educations.forEach((edu) => {
      if (edu.level) {
        promises.push(EmployeeService.education.post(matricule, withEmployee(edu, matricule)))
      }
    })

    skills.forEach((skill) => {
      if (skill.skill_name) {
        promises.push(EmployeeService.skill.post(matricule, withEmployee(skill, matricule)))
      }
    })

    await Promise.all(promises)

    return createdEmployee
  } catch (error) {
    logError('employee.create', error)
    throw error
  }
}

export const update_Employee = async (
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
    if (!employee.matricule) {
      throw new Error('Matricule is missing')
    }

    const updatedEmployee = await EmployeeService.put(employee, employee.matricule)
    const promises: Promise<any>[] = []

    if (professional.departement || professional.job_title || professional.superior) {
      promises.push(
        saveNestedResource(employee.matricule, professional, EmployeeService.professional),
      )
    }

    if (
      administrative.cin_number ||
      administrative.cin_issue_date ||
      administrative.cin_issue_place ||
      administrative.passport_number ||
      administrative.passport_issue_date ||
      administrative.passport_issue_place ||
      administrative.nif ||
      administrative.stat
    ) {
      promises.push(
        saveNestedResource(employee.matricule, administrative, EmployeeService.administrative),
      )
    }

    if (
      bank.payment_method ||
      bank.bank_name ||
      bank.rib ||
      bank.account_number ||
      bank.code_guichet ||
      bank.code_bank
    ) {
      promises.push(saveNestedResource(employee.matricule, bank, EmployeeService.bank))
    }

    if (
      coordinate.phone_number ||
      coordinate.email ||
      coordinate.home_address ||
      coordinate.emergency_contact_name ||
      coordinate.emergency_contact_phone
    ) {
      promises.push(saveNestedResource(employee.matricule, coordinate, EmployeeService.coordinate))
    }

    contracts.forEach((contract) => {
      if (contract.contract_type && contract.contract_start && contract.work_location) {
        promises.push(saveNestedResource(employee.matricule, contract, EmployeeService.contract))
      }
    })

    degrees.forEach((degree) => {
      if (degree.degree_name) {
        promises.push(saveNestedResource(employee.matricule, degree, EmployeeService.degree))
      }
    })

    educations.forEach((edu) => {
      if (edu.level) {
        promises.push(saveNestedResource(employee.matricule, edu, EmployeeService.education))
      }
    })

    skills.forEach((skill) => {
      if (skill.skill_name) {
        promises.push(saveNestedResource(employee.matricule, skill, EmployeeService.skill))
      }
    })

    await Promise.all(promises)

    return updatedEmployee
  } catch (error) {
    logError('employee.update', error)
    throw error
  }
}
