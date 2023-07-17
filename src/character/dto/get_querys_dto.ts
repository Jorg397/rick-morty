import { IsOptional, IsString, IsUUID } from 'class-validator'

export class GetQuerysDto {
  @IsString()
  @IsOptional()
  page = 1

  @IsUUID()
  @IsOptional()
  type: string

  @IsUUID()
  @IsOptional()
  specie: string
}
