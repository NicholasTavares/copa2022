import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateGoalDTO {
  @Max(90, {
    message: 'Is not possible to add goal in the game later 90 minutes',
  })
  @Min(0, {
    message: 'Is not possible to add goal in the game before starts',
  })
  @IsNumber()
  readonly at: number;

  @IsString()
  readonly game_id: string;

  @IsString()
  readonly player_id: string;
}
