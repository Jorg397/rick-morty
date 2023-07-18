import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ParticipationController } from './participation.controller'
import { ParticipationService } from './participation.service'

@Module({
  controllers: [ParticipationController],
  providers: [ParticipationService, PrismaService],
})
export class ParticipationModule {}
