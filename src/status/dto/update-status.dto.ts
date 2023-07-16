import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  type?: string
}
