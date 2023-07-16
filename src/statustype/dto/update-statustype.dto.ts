import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateStatustypeDto {
  @IsString()
  @IsNotEmpty()
  type: string
}
