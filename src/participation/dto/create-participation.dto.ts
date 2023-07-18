import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateParticipationDto {
  @IsUUID()
  @IsNotEmpty()
  character: string

  @IsUUID()
  @IsNotEmpty()
  episode: string

  @IsNotEmpty()
  @IsString()
  start: string

  @IsNotEmpty()
  @IsString()
  end: string
}
