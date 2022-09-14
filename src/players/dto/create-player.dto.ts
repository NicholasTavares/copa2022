import { IsNumber, IsString } from 'class-validator';

export class CreatePlayerDTO {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly shirt: number;

  @IsString()
  readonly team_id: string;
}
