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
import { ApiTags } from '@nestjs/swagger'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { LocationService } from './location.service'

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body(new ValidationPipe()) createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto)
  }

  @Get()
  findAll() {
    return this.locationService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(id)
  }
}
