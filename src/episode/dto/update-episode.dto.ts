import { IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateEpisodeDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  airDate: string

  @IsString()
  @IsOptional()
  episode: string

  @IsUUID()
  @IsOptional()
  season: string

  @IsString()
  @IsOptional()
  duration: number

  @IsUUID()
  @IsOptional()
  status: string
}
