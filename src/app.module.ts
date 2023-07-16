import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
