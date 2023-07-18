import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CharacterController } from './character.controller'
import { CharacterService } from './character.service'

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, PrismaService],
})
export class CharacterModule {}
