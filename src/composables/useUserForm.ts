import { computed, ref } from 'vue'
import type { User } from '@/types/User'

export const createDefaultUser = (): User => ({
  matricule: '',
  email: '',
  first_name: '',
  last_name: '',
  role: 'employee',
  is_staff: false,
  is_active: true,
})

export const useUserForm = () => {
  const form = ref<User>(createDefaultUser())

  const roleOptions = computed(() => [
    {
      label: 'Administrateur',
      value: 'admin',
      isActive: form.value.role === 'admin',
    },
    {
      label: 'Manager',
      value: 'manager',
      isActive: form.value.role === 'manager',
    },
    {
      label: 'Employé',
      value: 'employee',
      isActive: form.value.role === 'employee',
    },
  ])

  const setRole = (role: string) => {
    form.value.role = role
  }

  return {
    form,
    roleOptions,
    setRole,
  }
}
