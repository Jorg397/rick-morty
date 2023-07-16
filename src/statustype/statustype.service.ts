import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateStatustypeDto } from './dto/create-statustype.dto'
import { UpdateStatustypeDto } from './dto/update-statustype.dto'

@Injectable()
export class StatustypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStatustypeDto: CreateStatustypeDto) {
    return await this.prisma.statusType.create({
      data: createStatustypeDto,
    })
  }

  async findAll() {
    return await this.prisma.statusType.findMany({
      include: {
        statuses: true,
      },
    })
  }

  async findOne(id: string) {
    const statustype = await this.prisma.statusType.findUnique({
      where: {
        id,
      },
      include: {
        statuses: true,
      },
    })

    if (!statustype) {
      throw new NotFoundException('Statustype not found')
    }

    return statustype
  }

  async update(id: string, updateStatustypeDto: UpdateStatustypeDto) {
    const statustype = await this.prisma.statusType.findUnique({
      where: {
        id,
      },
    })

    if (!statustype) {
      throw new NotFoundException('Statustype not found')
    }

    return await this.prisma.statusType.update({
      where: {
        id,
      },
      data: updateStatustypeDto,
    })
  }

  async remove(id: string) {
    return await this.prisma.statusType.delete({
      where: {
        id,
      },
    })
  }
}
