import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateSubcategoryDto {
  @IsNotEmpty()
  @IsString()
  subcategory: string

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  category: string
}
