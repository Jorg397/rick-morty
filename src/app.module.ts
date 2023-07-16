import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { PrismaService } from './prisma/prisma.service'
import { SubcategoryModule } from './subcategory/subcategory.module';

@Module({
  imports: [CategoryModule, SubcategoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
