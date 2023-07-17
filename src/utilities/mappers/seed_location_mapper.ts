import { LocationAPI } from 'src/rick-morty/models/location_api.models'

export interface ParticipationObject {
  characterId: string
  startMinute: number
  startSecond: number
  endMinute: number
  endSecond: number
}

export const locationMapper = (apiLocation: LocationAPI[]) => {
  return apiLocation.map((location) => {
    return {
      name: location.name,
      type: location.type,
      dimension: location.dimension,
      originalIDs: [],
      residentIDs: [],
    }
  })
}

export const participationMapper = (
  apiParticipation: ParticipationObject,
): {
  start: string
  end: string
  characterId: string
} => {
  return {
    start: `${apiParticipation.startMinute}:${apiParticipation.startSecond}`,
    end: `${apiParticipation.endMinute}:${apiParticipation.endSecond}`,
    characterId: apiParticipation.characterId,
  }
}
