import type { Permission } from '@/types/Pemission'
import { http } from './http'
import { STATUS_CHOICES } from '@/enums/choices'

const PlanningService = {
  get: async () => {
    const res = await http.get('/planning/');
    return res.data;
  },
}

export default PlanningService
