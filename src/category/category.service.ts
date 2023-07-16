import { Injectable, NotFoundException } from '@nestjs/common'
import { Category } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({
      data: {
        category: createCategoryDto.name,
      },
    })
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany()
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    })

    if (!category) {
      throw new NotFoundException('Category not exists')
    }

    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    })

    if (!category) {
      throw new NotFoundException('Category not exists')
    }

    return await this.prisma.category.update({
      where: {
        id: id,
      },
      data: updateCategoryDto,
    })
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    })

    if (!category) {
      throw new NotFoundException('Category not exists')
    }

    return await this.prisma.category.delete({
      where: {
        id: id,
      },
    })
  }
}
