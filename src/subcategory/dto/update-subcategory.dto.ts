import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  subcategory: string

  @IsString()
  @IsOptional()
  category?: string
}
