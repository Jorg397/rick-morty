import { IsOptional, IsString, IsUUID } from 'class-validator'

export class QueryDto {
  @IsUUID()
  @IsOptional()
  season_id: string

  @IsString()
  @IsOptional()
  page: number
}
