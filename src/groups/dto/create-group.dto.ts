import { IsString } from 'class-validator';

export class CreateGroupDTO {
  @IsString()
  readonly name: string;
}
