import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { EpisodeController } from './episode.controller'
import { EpisodeService } from './episode.service'

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService, PrismaService],
})
export class EpisodeModule {}
