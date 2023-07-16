import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common'
import { CreateStatustypeDto } from './dto/create-statustype.dto'
import { UpdateStatustypeDto } from './dto/update-statustype.dto'
import { StatustypeService } from './statustype.service'

@Controller('statustype')
export class StatustypeController {
  constructor(private readonly statustypeService: StatustypeService) {}

  @Post()
  create(@Body(new ValidationPipe()) createStatustypeDto: CreateStatustypeDto) {
    return this.statustypeService.create(createStatustypeDto)
  }

  @Get()
  findAll() {
    return this.statustypeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statustypeService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateStatustypeDto: UpdateStatustypeDto,
  ) {
    return this.statustypeService.update(id, updateStatustypeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statustypeService.remove(id)
  }
}
