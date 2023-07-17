import { PrismaClient } from '@prisma/client'
import {
  CharactersApiService,
  EpisodesApiService,
  LocationsApiService,
} from '../src/rick-morty/services'
import { locationMapper, participationMapper } from '../src/utilities'
import { calculateParticipationsMinutes } from '../src/utilities/calculate_participations_minutes'

const prisma = new PrismaClient()

const rickMortyLocationService = new LocationsApiService()
const rickMortyCharacterService = new CharactersApiService()
const rickMortyEpisodeService = new EpisodesApiService()

async function main() {
  const locations = await rickMortyLocationService.getAllLocations()
  const characters = await rickMortyCharacterService.getAllCharacters()
  const episodes = await rickMortyEpisodeService.getAllEpisodes()

  const characterStatusType = await prisma.statusType.create({
    data: {
      type: 'Characters',
    },
  })

  const episodeStatusType = await prisma.statusType.create({
    data: {
      type: 'Episodes',
    },
  })

  const activeStatus = await prisma.status.create({
    data: {
      status: 'Active',
      typeId: characterStatusType.id,
    },
  })

  const suspendedStatus = await prisma.status.create({
    data: {
      status: 'Suspended',
      typeId: characterStatusType.id,
    },
  })

  const cancelledStatus = await prisma.status.create({
    data: {
      status: 'Cancelled',
      typeId: episodeStatusType.id,
    },
  })

  const activeEpisodeStatus = await prisma.status.create({
    data: {
      status: 'Active',
      typeId: episodeStatusType.id,
    },
  })

  await prisma.location.createMany({
    data: locationMapper(locations),
  })

  const unkownLocation = await prisma.location.create({
    data: {
      name: 'Unknown',
      dimension: 'unknown',
      type: 'unknown',
    },
  })

  for (const character of characters) {
    await prisma.character.create({
      data: {
        name: character.name,
        location: {
          connect: {
            name:
              character.location.name === 'unknown'
                ? unkownLocation.name
                : character.location.name,
          },
        },
        status: {
          connect: {
            status:
              character.status === 'Alive'
                ? activeStatus.status
                : suspendedStatus.status,
          },
        },
        specie: {
          connectOrCreate: {
            where: {
              subcategory: character.species,
            },
            create: {
              subcategory: character.species,
              category: {
                connectOrCreate: {
                  where: {
                    category: 'Species',
                  },
                  create: {
                    category: 'Species',
                  },
                },
              },
            },
          },
        },
        gender: character.gender,
        image: character.image,
        type: character.type,
        origin: {
          connect: {
            name:
              character.origin.name === 'unknown'
                ? unkownLocation.name
                : character.origin.name,
          },
        },
      },
    })
  }

  for (const episode of episodes.results) {
    const participations = await calculateParticipationsMinutes([episode])

    const participationsMapped = participations.map((participation) =>
      participationMapper(participation),
    )

    await prisma.episode.create({
      data: {
        airDate: episode.air_date,
        name: episode.name,
        episode: episode.episode,
        duration: 60,
        status: {
          connect: {
            status: activeEpisodeStatus.id,
          },
        },
        participations: {
          createMany: {
            data: participationsMapped,
          },
        },
        season: {
          connectOrCreate: {
            where: {
              subcategory: episode.episode.split('').slice(0, 2).join(''),
            },
            create: {
              subcategory: episode.episode.split('').slice(0, 2).join(''),
              category: {
                create: {
                  category: 'Season',
                },
              },
            },
          },
        },
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
