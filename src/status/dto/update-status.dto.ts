import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreateStatusDto } from './create-status.dto'

export class UpdateStatusDto extends PartialType(CreateStatusDto) {
  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  type?: string
}
