import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  dimension: string

  @IsString()
  @IsNotEmpty()
  type?: string

  @IsArray()
  @IsNotEmpty()
  residentIDs?: string[]

  @IsArray()
  @IsNotEmpty()
  originalIDs?: string[]
}
