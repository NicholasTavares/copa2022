import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRedCardDTO {
  @Max(90, {
    message: 'Is not possible to add red card in the game later 90 minutes',
  })
  @Min(0, {
    message: 'Is not possible to add red card in the game before starts',
  })
  @IsNumber()
  readonly at: number;

  @IsString()
  readonly game_id: string;

  @IsString()
  readonly player_id: string;
}
