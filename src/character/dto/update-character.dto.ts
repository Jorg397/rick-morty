import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

export class UpdateCharacterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  status?: string

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  species: string

  @IsString()
  @IsOptional()
  type: string

  @IsEnum(['Female', 'Male'])
  @IsNotEmpty()
  @IsOptional()
  gender: string

  @IsString()
  @IsOptional()
  image: string

  @IsArray()
  @IsOptional()
  episodes: string[]

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  location: string

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  origin: string

  @IsArray()
  @IsOptional()
  participations: string[]
}
