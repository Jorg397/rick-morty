import { Participation } from '@prisma/client'
import { PrismaService } from '../../src/prisma/prisma.service'
import type { EpisodeAPI } from '../rick-morty/models/episode_api.models'
import { CharactersApiService } from '../rick-morty/services'

const prisma = new PrismaService()

export async function calculateParticipationsMinutes(
  episode: EpisodeAPI,
): Promise<Participation[]> {
  const participations = []
  const characterApiService = new CharactersApiService()
  const numCharacters = episode.characters.length
  const durationPerCharacter = 60 / numCharacters

  for (let i = 0; i < numCharacters; i++) {
    const character = episode.characters[i]
    const characterId = Number(character.split('/')[5])
    const characterInfo = await characterApiService.getCharacterById(
      characterId,
    )
    const obtainDbId = await getDbCharacterId(characterInfo.id)

    const startMinute = Math.floor(i * durationPerCharacter)
    const startSecond = Math.floor(Math.random() * 60)
    const endMinute = Math.floor((i + 1) * durationPerCharacter)
    const endSecond = Math.floor(Math.random() * 60)

    participations.push({
      characterId: obtainDbId,
      start: `${startMinute}:${startSecond}`,
      end: `${endMinute}:${endSecond}`,
    })
  }

  return participations
}

export const getDbCharacterId = async (characterId: number) => {
  const character = await prisma.character.findUnique({
    where: {
      apiId: characterId,
    },
  })

  return character.id
}
