import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStatustypeDto {
  @IsString()
  @IsNotEmpty()
  type: string
}
