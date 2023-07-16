import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { PrismaService } from './prisma/prisma.service'
import { SubcategoryModule } from './subcategory/subcategory.module';
import { StatustypeModule } from './statustype/statustype.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [CategoryModule, SubcategoryModule, StatustypeModule, StatusModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
