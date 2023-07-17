import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Location } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const existingLocation = await this.prisma.location.findUnique({
      where: {
        name: createLocationDto.name,
      },
    })

    if (existingLocation) {
      throw new ConflictException('Location with this name already exists')
    }

    const newLocation = await this.prisma.location.create({
      data: {
        name: createLocationDto.name,
        dimension: createLocationDto.dimension,
        type: createLocationDto.type,
        residentIDs: createLocationDto.residentIDs,
        originalIDs: createLocationDto.originalIDs,
      },
    })

    return newLocation
  }

  async findAll(): Promise<Location[]> {
    const locations = await this.prisma.location.findMany({
      include: {
        residents: true,
        originalCharacters: true,
      },
    })
    return locations
  }

  async findOne(id: string): Promise<Location> {
    const findLocation = await this.prisma.location.findUnique({
      where: {
        id,
      },
      include: {
        residents: true,
        originalCharacters: true,
      },
    })
    if (!findLocation) {
      throw new NotFoundException('Location does not exist')
    }
    return findLocation
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const existingLocation = await this.prisma.location.findUnique({
      where: {
        id,
      },
    })

    if (!existingLocation) {
      throw new NotFoundException('Location does not exist')
    }

    return await this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.prisma.location.delete({
      where: {
        id,
      },
    })
  }
}
