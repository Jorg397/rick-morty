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
import { CharacterService } from './character.service'
import { CreateCharacterDto } from './dto/create-character.dto'
import { GetQuerysDto } from './dto/get_querys_dto'
import { UpdateCharacterDto } from './dto/update-character.dto'

@ApiTags('Character')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto)
  }

  @Get()
  findAll(@Query(new ValidationPipe()) query: GetQuerysDto) {
    return this.characterService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(id)
  }
}
