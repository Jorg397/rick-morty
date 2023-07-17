import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Character, Location } from '@prisma/client'
import { LocationService } from 'src/location/location.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { StatusService } from 'src/status/status.service'
import { CreateCharacterDto } from './dto/create-character.dto'
import { GetQuerysDto } from './dto/get_querys_dto'
import { UpdateCharacterDto } from './dto/update-character.dto'

@Injectable()
export class CharacterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly statusService: StatusService,
    private readonly locationService: LocationService,
  ) {}

  private async _findLocation(id: string): Promise<Location> {
    const findLocation = await this.locationService.findOne(id)
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

    return await this.prisma.character.create({ data: characterData })
  }

  async findAll(query: GetQuerysDto): Promise<Character[]> {
    const skip = query.page * 5
    const take = 5

    return await this.prisma.character.findMany({
      include: {
        participations: true,
        location: true,
        status: true,
      },
      where: {
        type: query.type,
        specieId: query.specie,
      },
      take,
    })
  }

  async findOne(id: string): Promise<Character> {
    const findCharacter = await this.prisma.character.findUnique({
      where: {
        id,
      },
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
    })
  }

  async remove(id: string): Promise<Character> {
    const suspendedStatus = await this.statusService.findOne(id)

    await this.findOne(id)
    return await this.prisma.character.update({
      where: { id },
      data: {
        statusId: suspendedStatus.id,
      },
    })
  }
}
