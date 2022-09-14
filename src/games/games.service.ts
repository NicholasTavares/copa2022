import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDTO } from './dto/create-game.dto';
import { UpdateGameDTO } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { TeamsService } from '../teams/teams.service';
import { CountScoreGame } from '../utils/CountScoreGame';
import { IGame } from './models/IGame';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @Inject(TeamsService)
    private readonly teamsService: TeamsService,
  ) {}

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  async findOne(id: string): Promise<IGame> {
    const game = await this.gamesRepository
      .createQueryBuilder('games')
      .where({
        id,
      })
      .leftJoin('games.team_one_id', 'team_one')
      .leftJoin('games.team_two_id', 'team_two')
      .leftJoin('games.goals', 'goals')
      .leftJoin('goals.player_id', 'player')
      .leftJoin('player.team_id', 'player_team')
      .leftJoin('games.red_cards', 'red_cards')
      .leftJoin('red_cards.player_id', 'player_red_card')
      .leftJoin('player_red_card.team_id', 'player_red_card_team')
      .leftJoin('games.yellow_cards', 'yellow_cards')
      .leftJoin('yellow_cards.player_id', 'player_yellow_card')
      .leftJoin('player_yellow_card.team_id', 'player_yellow_card_team')
      .select([
        'games.id',
        'games.description',
        'games.judge',
        'games.game_date',
        'team_one.id',
        'team_one.country',
        'team_one.coach',
        'team_one.image',
        'team_two.id',
        'team_two.country',
        'team_two.coach',
        'team_two.image',
        'goals.at',
        'red_cards.at',
        'yellow_cards.at',
      ])
      .addSelect([
        'player.id',
        'player.name',
        'player.shirt',
        'player_team.id',
        'player_team.country',
        'player_red_card.id',
        'player_red_card.name',
        'player_red_card.shirt',
        'player_red_card_team.country',
        'player_yellow_card.id',
        'player_yellow_card.name',
        'player_yellow_card.shirt',
        'player_yellow_card_team.country',
      ])
      .getOne();

    if (!game) {
      throw new NotFoundException(`Game ID ${id} not found`);
    }

    const game_score = CountScoreGame(
      game.goals,
      game.team_one_id,
      game.team_two_id,
    );

    return {
      ...(game as unknown as IGame),
      ...game_score,
    };
  }

  async update(id: string, updateGameDTO: UpdateGameDTO) {
    const game = await this.gamesRepository.preload({
      id,
      ...updateGameDTO,
    });

    if (!game) {
      throw new NotFoundException(`Game ID ${id} not found`);
    }

    return this.gamesRepository.save(game);
  }

  async create(createGameDTO: CreateGameDTO): Promise<Game> {
    const game = this.gamesRepository.create({
      ...createGameDTO,
    });

    const team_one = await this.teamsService.findOne(game.team_one_id);
    const team_two = await this.teamsService.findOne(game.team_two_id);

    if (
      team_one.group_id.id !== team_two.group_id.id ||
      !team_one.group_id ||
      !team_two.group_id
    ) {
      throw new BadRequestException('Teams should belong to the same group');
    }

    await this.teamsService.incrementDraws(game.team_one_id);
    await this.teamsService.incrementDraws(game.team_two_id);

    return this.gamesRepository.save(game);
  }

  async remove(id: string): Promise<void> {
    await this.gamesRepository.softDelete(id);
  }
}
