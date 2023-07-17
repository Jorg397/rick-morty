import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsUUID()
  @IsNotEmpty()
  status: string

  @IsUUID()
  species: string

  @IsString()
  type: string

  @IsEnum(['female', 'male'], {
    message: 'Gender must be either female or male',
  })
  @IsNotEmpty()
  gender: string

  @IsString()
  image: string

  @IsArray()
  @IsOptional()
  episodes: string[]

  @IsUUID()
  @IsNotEmpty()
  location: string

  @IsUUID()
  @IsNotEmpty()
  origin: string

  @IsArray()
  @IsOptional()
  participations: string[]
}
