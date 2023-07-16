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
import { CreateStatusDto } from './dto/create-status.dto'
import { UpdateStatusDto } from './dto/update-status.dto'
import { StatusService } from './status.service'

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  create(@Body(new ValidationPipe()) createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto)
  }

  @Get()
  findAll() {
    return this.statusService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateStatusDto: UpdateStatusDto,
  ) {
    return this.statusService.update(id, updateStatusDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(id)
  }
}
