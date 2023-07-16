import { IsArray, IsString } from 'class-validator'

export class UpdateLocationDto {
  @IsString()
  name?: string

  @IsString()
  dimension?: string

  @IsString()
  type?: string

  @IsArray()
  residentIDs?: string[]

  @IsArray()
  originalIDs?: string[]
}
