import { Injectable, NotFoundException } from '@nestjs/common'
import { Status } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { StatustypeService } from 'src/statustype/statustype.service'
import { CreateStatusDto } from './dto/create-status.dto'
import { UpdateStatusDto } from './dto/update-status.dto'

@Injectable()
export class StatusService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly statusTypeService: StatustypeService,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const findStatustype = await this.statusTypeService.findOne(
      createStatusDto.type,
    )

    return await this.prisma.status.create({
      data: {
        status: createStatusDto.status,
        typeId: findStatustype.id,
      },
    })
  }

  async findAll(): Promise<Status[]> {
    return await this.prisma.status.findMany()
  }

  async findOne(id: string) {
    const status = await this.prisma.status.findUnique({
      where: {
        id,
      },
    })

    if (!status) {
      throw new NotFoundException('Category not exists')
    }

    return status
  }

  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const findIfExists = await this.prisma.status.findUnique({
      where: {
        id,
      },
    })

    if (!findIfExists) {
      throw new NotFoundException('Status not exists')
    }

    return await this.prisma.status.update({
      where: {
        id,
      },
      data: {
        status: updateStatusDto.status,
      },
    })
  }

  async remove(id: string): Promise<Status> {
    const deletedStatus = await this.prisma.status.delete({
      where: {
        id,
      },
    })

    if (!deletedStatus) {
      throw new NotFoundException('Status not exists')
    }

    return deletedStatus
  }
}
