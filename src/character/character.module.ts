import { Module } from '@nestjs/common'
import { LocationService } from 'src/location/location.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { StatusService } from 'src/status/status.service'
import { StatustypeService } from 'src/statustype/statustype.service'
import { CharacterController } from './character.controller'
import { CharacterService } from './character.service'

@Module({
  controllers: [CharacterController],
  providers: [
    CharacterService,
    PrismaService,
    StatusService,
    LocationService,
    StatustypeService,
  ],
})
export class CharacterModule {}
