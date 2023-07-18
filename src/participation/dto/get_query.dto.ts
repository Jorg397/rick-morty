import { IsOptional, IsUUID } from 'class-validator'

export class GetQuerysDto {
  @IsOptional()
  page = 1

  @IsUUID()
  @IsOptional()
  season: string

  @IsUUID()
  @IsOptional()
  char_status: string

  @IsUUID()
  @IsOptional()
  episode_status: string
}
