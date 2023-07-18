import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SubcategoryController } from './subcategory.controller'
import { SubcategoryService } from './subcategory.service'

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService, PrismaService],
})
export class SubcategoryModule {}
