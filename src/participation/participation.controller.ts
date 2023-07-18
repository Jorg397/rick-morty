import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateParticipationDto } from './dto/create-participation.dto'
import { GetQuerysDto } from './dto/get_query.dto'
import { UpdateParticipationDto } from './dto/update-participation.dto'
import { ParticipationService } from './participation.service'

@ApiTags('Participation')
@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createParticipationDto: CreateParticipationDto,
  ) {
    return this.participationService.create(createParticipationDto)
  }

  @Get()
  findAll(@Query(new ValidationPipe()) query: GetQuerysDto) {
    return this.participationService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participationService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateParticipationDto: UpdateParticipationDto,
  ) {
    return this.participationService.update(id, updateParticipationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participationService.remove(id)
  }

  @Delete('/character/:character/episode/:episode')
  removeByCharacterEpisode(
    @Param('character') character: string,
    @Param('episode') episode: string,
  ) {
    return this.participationService.removeCharacterParticipationsOnEpisode(
      episode,
      character,
    )
  }
}
