import { Participation } from '@prisma/client'

export function checkIfParticipationTimesOverlap(
  start: string,
  end: string,
  participations: Participation[],
): boolean {
  const updatedStartTime = convertTimeToMinutes(start)
  const updatedEndTime = convertTimeToMinutes(end)

  for (const participation of participations) {
    const startTime = convertTimeToMinutes(participation.start)
    const endTime = convertTimeToMinutes(participation.end)

    if (
      (updatedStartTime >= startTime && updatedStartTime < endTime) ||
      (updatedEndTime > startTime && updatedEndTime <= endTime) ||
      (updatedStartTime <= startTime && updatedEndTime >= endTime)
    ) {
      return true
    }
  }

  return false
}

function convertTimeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number)
  return hours * 60 + minutes
}
