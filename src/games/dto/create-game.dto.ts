import { IsString } from 'class-validator';
import { NotMatchesWithProperty } from '../../utils/MatchCompare';

export class CreateGameDTO {
  @IsString()
  readonly description: string;

  @IsString()
  readonly judge: string;

  @IsString()
  readonly team_one_id: string;

  @NotMatchesWithProperty(CreateGameDTO, (s) => s.team_one_id, {
    message: 'A game should be between two diferents teams!',
  })
  @IsString()
  readonly team_two_id: string;

  @IsString()
  readonly game_date: Date;
}
