import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  type: string
}
