import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  airDate: string

  @IsString()
  @IsNotEmpty()
  episode: string

  @IsUUID()
  @IsNotEmpty()
  season: string

  @IsNumber()
  @IsNotEmpty()
  duration: number

  @IsUUID()
  @IsNotEmpty()
  status: string
}
