import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { StatustypeController } from './statustype.controller'
import { StatustypeService } from './statustype.service'

@Module({
  controllers: [StatustypeController],
  providers: [StatustypeService, PrismaService],
})
export class StatustypeModule {}
