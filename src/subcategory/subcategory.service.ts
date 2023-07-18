import { Injectable, NotFoundException } from '@nestjs/common'
import { SubCategory } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto'

@Injectable()
export class SubcategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<SubCategory> {
    const findCategory = await this.prisma.category.findUnique({
      where: {
        id: createSubcategoryDto.category,
      },
    })

    if (!findCategory) {
      throw new NotFoundException('Category not exists')
    }

    return await this.prisma.subCategory.create({
      data: {
        subcategory: createSubcategoryDto.subcategory,
        categoryId: createSubcategoryDto.category,
      },
    })
  }

  async findAll(): Promise<SubCategory[]> {
    return await this.prisma.subCategory.findMany()
  }

  async findOne(id: string): Promise<SubCategory> {
    const findSubcategory = await this.prisma.subCategory.findUnique({
      where: {
        id: id,
      },
    })

    if (!findSubcategory) {
      throw new NotFoundException('Subcategory not exists')
    }

    return findSubcategory
  }

  async findByCategory(id: string): Promise<SubCategory[]> {
    return await this.prisma.subCategory.findMany({
      where: {
        categoryId: id,
      },
    })
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    const findSubcategory = await this.prisma.subCategory.findUnique({
      where: {
        id: id,
      },
    })

    if (!findSubcategory) {
      throw new NotFoundException('Subcategory not exists')
    }

    return await this.prisma.subCategory.update({
      where: {
        id: id,
      },
      data: {
        categoryId: updateSubcategoryDto.category,
        subcategory: updateSubcategoryDto.subcategory,
      },
    })
  }

  remove(id: string) {
    return this.prisma.subCategory.delete({
      where: {
        id: id,
      },
    })
  }
}
