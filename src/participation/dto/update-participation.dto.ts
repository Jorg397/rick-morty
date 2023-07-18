import { IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateParticipationDto {
  @IsUUID()
  @IsOptional()
  character: string

  @IsUUID()
  @IsOptional()
  episode: string

  @IsOptional()
  @IsString()
  start: string

  @IsOptional()
  @IsString()
  end: string
}
