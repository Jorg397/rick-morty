import {
  CharactersApiService,
  EpisodesApiService,
  LocationsApiService,
} from '../src/rick-morty/services'

import { PrismaService } from '../src/prisma/prisma.service'
import { calculateParticipationsMinutes } from '../src/utilities/calculate_participations_minutes'

const prisma = new PrismaService()

const rickMortyLocationService = new LocationsApiService()
const rickMortyCharacterService = new CharactersApiService()
const rickMortyEpisodeService = new EpisodesApiService()

async function main() {
  //status ids
  let characterActiveStatus: string
  let characterSuspendedStatus: string

  let episodeCancelledStatus: string
  let episodeActiveStatus: string

  //subcategories ids
  let specieCategory: string
  let seasonCategory: string

  async function seedLocations() {
    console.log('Fetching locations from Rick and Morty API...')
    const locations = await rickMortyLocationService.getAllLocations()

    console.log(`LOCATIONS:`)

    for (const location of locations) {
      await prisma.location.create({
        data: {
          name: location.name,
          type: location.type,
          dimension: location.dimension,
        },
      })

      console.log(
        `Created location: ${location.name}, dimension: ${location.dimension}`,
      )
    }

    console.log('----------------------------------------------------')
  }

  async function seedStatuses() {
    console.log('Creating statuses...')

    const statusTypes = ['characters', 'episodes']
    let characterStatusType = ''
    let episodeStatusType = ''
    const characterStatus = ['active', 'suspended']
    const episodeStatus = ['cancelled', 'active']

    console.log('STATUSES:')
    for (const statusType of statusTypes) {
      const type = await prisma.statusType.create({
        data: {
          type: statusType,
        },
      })

      if (statusType === 'characters') {
        characterStatusType = type.id
      } else {
        episodeStatusType = type.id
      }

      console.log(`Created status type: ${type.type}`)
    }

    for (const status of characterStatus) {
      const statusCreated = await prisma.status.create({
        data: {
          status,
          typeId: characterStatusType,
        },
      })

      if (status === 'active') {
        characterActiveStatus = statusCreated.id
      } else {
        characterSuspendedStatus = statusCreated.id
      }

      console.log(`Created status: ${statusCreated.status}`)
    }

    for (const status of episodeStatus) {
      const statusCreated = await prisma.status.create({
        data: {
          status,
          typeId: episodeStatusType,
        },
      })

      if (status === 'cancelled') {
        episodeCancelledStatus = statusCreated.id
      } else {
        episodeActiveStatus = statusCreated.id
      }

      console.log(`Created status: ${statusCreated.status}`)
    }

    console.log('----------------------------------------------------')
  }

  async function seedCategories() {
    console.log('Creating categories...')

    const categories = ['specie', 'season']

    console.log('CATEGORIES:')

    for (const category of categories) {
      const categoryCreated = await prisma.category.create({
        data: {
          category,
        },
      })

      if (category === 'specie') {
        specieCategory = categoryCreated.id
      } else {
        seasonCategory = categoryCreated.id
      }

      console.log(`Created category: ${categoryCreated.category}`)
    }

    console.log('----------------------------------------------------')
  }

  async function seedCharacters() {
    console.log('Fetching characters from Rick and Morty API...')
    const characters = await rickMortyCharacterService.getAllCharacters()

    console.log(`CHARACTERS:`)
    for (const character of characters) {
      await prisma.character.create({
        data: {
          name: character.name,
          gender: character.gender,
          image: character.image,
          type: character.type,
          apiId: character.id,
          specie: {
            connectOrCreate: {
              where: {
                subcategory: character.species,
              },
              create: {
                subcategory: character.species,
                categoryId: specieCategory,
              },
            },
          },
          location: {
            connectOrCreate: {
              where: {
                name: character.location.name,
              },
              create: {
                name: character.location.name,
                dimension: character.location.name,
                type: character.location.name,
              },
            },
          },
          origin: {
            connectOrCreate: {
              where: {
                name: character.origin.name,
              },
              create: {
                name: character.origin.name,
                dimension: character.origin.name,
                type: character.origin.name,
              },
            },
          },
          status: {
            connectOrCreate: {
              where: {
                id:
                  character.status === 'Alive'
                    ? characterActiveStatus
                    : characterSuspendedStatus,
              },
              create: {
                status: character.status,
                type: {
                  connect: {
                    type: 'characters',
                  },
                },
              },
            },
          },
        },
      })

      console.log(
        `Created character: ${character.name}, location: ${character.location.name}, specie: ${character.species}`,
      )
    }

    console.log('----------------------------------------------------')
  }

  async function seedEpisodes() {
    console.log('Fetching episodes from Rick and Morty API...')
    const episodes = await rickMortyEpisodeService.getAllEpisodes()

    console.log(`EPISODES:`)
    const findOrCreateSeason = async (season: string) => {
      const findSeason = await prisma.subCategory.findUnique({
        where: {
          subcategory: season,
        },
      })

      if (findSeason) {
        return findSeason
      }

      const createSeason = await prisma.subCategory.create({
        data: {
          subcategory: season,
          categoryId: seasonCategory,
        },
      })

      return createSeason
    }

    for (const episode of episodes) {
      const participations = await calculateParticipationsMinutes(episode)
      const season = await findOrCreateSeason(
        episode.episode.split('').slice(0, 3).join(''),
      )

      console.log(`Creating episode: ${episode.name}`)

      const episodeCreated = await prisma.episode.create({
        data: {
          name: episode.name,
          airDate: episode.air_date,
          episode: episode.episode,
          duration: 60,
          seasonId: season.id,
          statusId: '1c840386-5574-4a8e-b2e5-f869a1481ddf',
        },
      })
      console.log(
        `Created episode: ${episode.name}, season: ${episode.episode
          .split('')
          .slice(0, 3)
          .join('')}`,
      )

      console.log('----------------------------------------')

      console.log(`Creating participations for episode: ${episodeCreated.name}`)

      for (const participation of participations) {
        await prisma.participation.create({
          data: {
            episodeId: episodeCreated.id,
            characterId: participation.characterId,
            start: participation.start,
            end: participation.end,
          },
        })

        console.log(
          `Created participation for episode: ${episodeCreated.name}, character: ${participation.characterId}`,
        )
      }
    }

    console.log('----------------------------------------------------')
  }

  await seedStatuses()
  await seedCategories()
  await seedLocations()
  await seedCharacters()
  await seedEpisodes()
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
