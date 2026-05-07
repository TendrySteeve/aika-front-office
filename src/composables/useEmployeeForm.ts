import { reactive } from 'vue'
import {
  CONTRACT_TYPE_CHOICES,
  MARITAL_STATUS_CHOICES,
  SEX_CHOICES,
} from '@/enums/choices'

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


const createEmployee = (): Employee => ({
  matricule: '',
  first_name: '',
  last_name: '',
  birth_date: '',
  birth_place: '',
  sex: SEX_CHOICES.male,
  nationality: '',
  marital_status: MARITAL_STATUS_CHOICES.single,
})

const createProfessional = (): Professional => ({
  employee: '',
  departement: '',
  job_title: '',
  superior: '',
})

const createAdministrative = (): Administrative => ({
  employee: '',
  cin_number: '',
  cin_issue_date: '',
  cin_issue_place: '',
  passport_number: undefined,
  passport_issue_date: undefined,
  passport_issue_place: '',
  nif: '',
  stat: '',
})

const createBank = (): Bank => ({
  employee: '',
  payment_method: '',
  bank_name: '',
  rib: '',
  account_number: '',
  code_guichet: '',
  code_bank: '',
})

const createCoordinate = (): Coordinate => ({
  employee: '',
  phone_number: '',
  email: '',
  home_address: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
})

const createContract = (): Contract => ({
  employee: '',
  contract_type: CONTRACT_TYPE_CHOICES.CDI,
  contract_start: '',
  contract_end: '',
  work_location: '',
})

const createEducation = (): Education => ({
  employee: '',
  level: '',
  institution: '',
})

const createDegree = (): Degree => ({
  employee: '',
  degree_name: '',
  institution: '',
  graduation_year: '',
})

const createSkill = (): Skill => ({
  employee: '',
  skill_name: '',
  level: '',
  description: '',
})


export function useEmployeeForm() {
  const form = reactive({
    employee: createEmployee(),
    professional: createProfessional(),
    administrative: createAdministrative(),
    bank: createBank(),
    coordinate: createCoordinate(),

    contracts: [createContract()],
    educations: [createEducation()],
    degrees: [createDegree()],
    skills: [createSkill()],
  })


  const addItem = <T>(list: T[], factory: () => T) => {
    list.push(factory())
  }

  const removeItem = <T>(list: T[], index: number) => {
    if (list.length === 1) return
    list.splice(index, 1)
  }

  const reset = () => {
    form.employee = createEmployee()
    form.professional = createProfessional()
    form.administrative = createAdministrative()
    form.bank = createBank()
    form.coordinate = createCoordinate()

    form.contracts = [createContract()]
    form.educations = [createEducation()]
    form.degrees = [createDegree()]
    form.skills = [createSkill()]
  }

  return {
    form,

    addItem,
    removeItem,

    factories: {
      createEmployee,
      createProfessional,
      createAdministrative,
      createBank,
      createCoordinate,
      createContract,
      createEducation,
      createDegree,
      createSkill,
    },

    reset,
  }
}
