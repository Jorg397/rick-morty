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
import { GetQuerysDto } from 'src/character/dto/get_querys_dto'
import { CreateEpisodeDto } from './dto/create-episode.dto'
import { UpdateEpisodeDto } from './dto/update-episode.dto'
import { EpisodeService } from './episode.service'
import { QueryDto } from './dto/get_query_dto'

@ApiTags('Episode')
@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  create(@Body(new ValidationPipe()) createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.create(createEpisodeDto)
  }

  @Get()
  findAll(@Query(new ValidationPipe()) query: QueryDto) {
    return this.episodeService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodeService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.episodeService.update(id, updateEpisodeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodeService.remove(id)
  }
}
