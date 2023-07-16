import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateSubcategoryDto } from './create-subcategory.dto'

export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {
  @IsString()
  @IsNotEmpty()
  subcategory: string
}
