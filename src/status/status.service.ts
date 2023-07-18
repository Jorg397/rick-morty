import { Injectable, NotFoundException } from '@nestjs/common'
import { Status } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

import { CreateStatusDto } from './dto/create-status.dto'
import { UpdateStatusDto } from './dto/update-status.dto'

@Injectable()
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const findStatustype = await this.prisma.statusType.findUnique({
      where: {
        id: createStatusDto.status,
      },
    })

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

  async findOne(id: string): Promise<Status> {
    const status = await this.prisma.status.findUnique({
      where: {
        id,
      },
    })

    if (!status) {
      throw new NotFoundException('Status not exists')
    }

    return status
  }

  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
    await this.findOne(id)

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
