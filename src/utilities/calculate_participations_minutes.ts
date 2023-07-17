import { PrismaClient } from '@prisma/client'
import { EpisodeAPI } from '../../src/rick-morty/models/episode_api.models'
import { CharactersApiService } from '../../src/rick-morty/services'
import { ParticipationObject } from './mappers'

const prisma = new PrismaClient()

export async function calculateParticipationsMinutes(
  episodes: EpisodeAPI[],
): Promise<ParticipationObject[]> {
  const participations = []

  const characterApiService = new CharactersApiService()

  for (const episode of episodes) {
    const { characters } = episode
    const numCharacters = characters.length

    // Calcular la duración de participación de cada personaje
    const durationPerCharacter = 60 / numCharacters

    // Iterar sobre cada personaje en el episodio
    for (let i = 0; i < numCharacters; i++) {
      const character = characters[i]
      const characterInfo = await characterApiService.getCharacterById(
        Number(character.split('/')[5]),
      )

      // Calcular el tiempo de inicio y finalización de la participación
      const startMinute = Math.floor(i * durationPerCharacter)
      const startSecond = Math.floor(Math.random() * 60)

      const endMinute = Math.floor((i + 1) * durationPerCharacter)
      const endSecond = Math.floor(Math.random() * 60)

      participations.push({
        characterId: getDbCharacterId(characterInfo.id),
        startMinute: startMinute,
        startSecond: startSecond,
        endMinute: endMinute,
        endSecond: endSecond,
      })
    }
  }

  return participations
}

export const getDbCharacterId = async (apiId: number) => {
  const character = await prisma.character.findFirst({
    where: {
      apiId: apiId,
    },
  })

  return character.id
}
