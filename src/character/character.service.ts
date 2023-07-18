import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Character, Location } from '@prisma/client'
import { IGetAllResponse } from 'src/models/get_all_response.interface'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCharacterDto } from './dto/create-character.dto'
import { GetQuerysDto } from './dto/get_querys_dto'
import { UpdateCharacterDto } from './dto/update-character.dto'

@Injectable()
export class CharacterService {
  private _includes = {
    status: true,
    location: true,
    specie: true,
    participations: true,
  }

  constructor(private readonly prisma: PrismaService) {}

  private async _findLocation(id: string): Promise<Location> {
    const findLocation = await this.prisma.location.findUnique({
      where: {
        id,
      },
    })
    return findLocation
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const verifyIfExists = await this.prisma.character.findFirst({
      where: {
        name: createCharacterDto.name,
        type: createCharacterDto.type,
        specieId: createCharacterDto.species,
      },
    })

    if (verifyIfExists) {
      throw new ConflictException(
        'Character with this name, type and specie already exists',
      )
    }

    const findLocation = await this._findLocation(createCharacterDto.location)
    const findOriginLocation = await this._findLocation(
      createCharacterDto.origin,
    )

    if (!findLocation) {
      throw new NotFoundException('Location not found')
    }

    if (!findOriginLocation) {
      throw new NotFoundException('Origin location not found')
    }

    const characterData = {
      name: createCharacterDto.name,
      statusId: createCharacterDto.status,
      gender: createCharacterDto.gender,
      type: createCharacterDto.type,
      locationId: findLocation.id,
      originId: findOriginLocation.id,
      episodeIDs: createCharacterDto.episodes,
      image: createCharacterDto.image,
      specieId: createCharacterDto.species,
    }

    return await this.prisma.character.create({
      data: characterData,
      include: this._includes,
    })
  }

  async findAll(query: GetQuerysDto): Promise<IGetAllResponse<Character>> {
    const { page, specie, type } = query

    const skip = Number(page) || 1 * 5
    const take = 5

    const charactersLength = await this.prisma.character.count({
      where: {
        specieId: specie,
        type: type,
      },
    })

    const characters = await this.prisma.character.findMany({
      include: this._includes,

      where: {
        type: type,
        specieId: specie,
      },
      take,
      skip,
    })

    return {
      info: {
        count: charactersLength,
        pages: Math.ceil(charactersLength / take),
        current_page: Number(page) || 1,
      },
      results: characters,
    }
  }

  async findOne(id: string): Promise<Character> {
    const findCharacter = await this.prisma.character.findUnique({
      where: {
        id,
      },
      include: this._includes,
    })

    if (!findCharacter) {
      throw new NotFoundException('Character does not exist')
    }

    return findCharacter
  }

  async update(
    id: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    await this.findOne(id)

    const findLocation = await this._findLocation(updateCharacterDto.location)
    const findOriginLocation = await this._findLocation(
      updateCharacterDto.origin,
    )

    return await this.prisma.character.update({
      where: { id },
      data: {
        name: updateCharacterDto.name,
        gender: updateCharacterDto.gender,
        type: updateCharacterDto.type,
        locationId: findLocation.id,
        originId: findOriginLocation.id,
        episodeIDs: updateCharacterDto.episodes,
        image: updateCharacterDto.image,
        specieId: updateCharacterDto.species,
      },

      include: this._includes,
    })
  }

  async remove(id: string): Promise<Character> {
    const suspendedStatus = await this.prisma.status.findUnique({
      where: {
        status: 'suspended',
      },
    })

    await this.findOne(id)
    return await this.prisma.character.update({
      where: { id },
      data: {
        statusId: suspendedStatus.id,
      },
      include: this._includes,
    })
  }
}
