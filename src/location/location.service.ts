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
    const findlocation = await this.prisma.location.findUnique({
      where: {
        name: createLocationDto.name,
      },
    })

    if (findlocation)
      throw new ConflictException('Location with this name already exists')

    return await this.prisma.location.create({
      data: {
        name: createLocationDto.name,
        dimension: createLocationDto.dimension,
        type: createLocationDto.type,
        residentIDs: createLocationDto?.residentIDs,
        originalIDs: createLocationDto?.originalIDs,
      },
    })
  }

  async findAll(): Promise<Location[]> {
    return await this.prisma.location.findMany()
  }

  async findOne(id: string): Promise<Location> {
    const findlocation = await this.prisma.location.findUnique({
      where: {
        id,
      },
    })

    if (!findlocation) {
      throw new NotFoundException('Location not exists')
    }

    return findlocation
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    await this.findOne(id)

    return await this.prisma.location.update({
      where: {
        id,
      },
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
