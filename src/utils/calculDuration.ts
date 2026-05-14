import { PERIOD_CHOICES } from '@/enums/choices'

export const calculatedHourDuration = (departure_time: string, return_time: string) => {
  if (!departure_time || !return_time) return 0

  const parseTime = (time: string) => {
    const parts = time.split(':').map(Number)
    const [h = 0, m = 0] = parts
    return h * 60 + m
  }

  const startInMinutes = parseTime(departure_time)
  const endInMinutes = parseTime(return_time)

  let diffInMinutes = endInMinutes - startInMinutes
  if (diffInMinutes < 0) {
    diffInMinutes += 24 * 60
  }

  return parseFloat((diffInMinutes / 60).toFixed(2))
}

export const calculatedDayDuration = (params: {
  start: string
  end: string
  period_start?: PERIOD_CHOICES
  period_end?: PERIOD_CHOICES
}) => {
  if (!params.start || !params.end) return 0

  const start = new Date(params.start)
  const end = new Date(params.end)

  if (end < start) return 0

  const diffTime = Math.abs(end.getTime() - start.getTime())
  let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

  if (params.period_start === PERIOD_CHOICES.PM) {
    days -= 0.5
  }
  if (params.period_end === PERIOD_CHOICES.AM) {
    days -= 0.5
  }

  return days > 0 ? days : 0
}
