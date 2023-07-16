import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { StatustypeService } from 'src/statustype/statustype.service'
import { StatusController } from './status.controller'
import { StatusService } from './status.service'

@Module({
  controllers: [StatusController],
  providers: [StatusService, PrismaService, StatustypeService],
})
export class StatusModule {}
