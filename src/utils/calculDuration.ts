import { PERIOD_CHOICES } from "@/enums/choices";
import type { AuthorizationRequest } from "@/types/Authorization";
import type { Leave } from "@/types/Leave";

export const calculatedHourDuration = (authorization: Partial<AuthorizationRequest>) => {
    if (!authorization.departure_time || !authorization.return_time) return 0;

    const [startH, startM] = authorization.departure_time.split(':').map(Number);
    const [endH, endM] = authorization.return_time.split(':').map(Number);

    let startInMinutes = 0;
    let endInMinutes = 0;

    if (startH && startM) startInMinutes = startH * 60 + startM;
    if (endH && endM) endInMinutes = endH * 60 + endM;

    if (endInMinutes <= startInMinutes) return 0;

    const diffInMinutes = endInMinutes - startInMinutes;
    return parseFloat((diffInMinutes / 60).toFixed(2));
};


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
