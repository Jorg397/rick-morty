import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  subcategory: string

  @IsString()
  @IsNotEmpty()
  category?: string
}
