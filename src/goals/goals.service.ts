import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoalDTO } from './dto/create-goal.dto';
import { UpdateGoalDTO } from './dto/update-goal.dto';
import { Goal } from './entities/goal.entity';
import { GamesService } from '../games/games.service';
import { TeamsService } from '../teams/teams.service';
import { CountScoreGame } from '../utils/CountScoreGame';
import { CheckWichTeamScored } from '../utils/CheckWichTeamScored';
import { CheckIncrementeOrDecrementScore } from '../utils/CheckIncrementeOrDecrementScore';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
    @Inject(GamesService)
    private gamesService: GamesService,
    @Inject(TeamsService)
    private teamsService: TeamsService,
  ) {}

  findAll(): Promise<Goal[]> {
    return this.goalsRepository.find();
  }

  async findOne(id: string): Promise<Goal> {
    const goal = await this.goalsRepository.findOne({
      where: { id },
      relations: ['player_id'],
    });

    if (!goal) {
      throw new NotFoundException(`Goal ID ${id} not found`);
    }

    return goal;
  }

  async update(id: string, updateGoalDTO: UpdateGoalDTO) {
    const goal = await this.goalsRepository.preload({
      id,
      ...updateGoalDTO,
    });

    if (!goal) {
      throw new NotFoundException(`Goal ID ${id} not found`);
    }

    return this.goalsRepository.save(goal);
  }

  async create(createGoalDTO: CreateGoalDTO): Promise<Goal> {
    const goal = this.goalsRepository.create({
      ...createGoalDTO,
    });

    const savedGoal = await this.goalsRepository.save(goal);

    const game = await this.gamesService.findOne(goal.game_id);
    const team_one = await this.teamsService.findOne(game.team_one_id.id);
    const team_two = await this.teamsService.findOne(game.team_two_id.id);

    const score_by_teams = CountScoreGame(
      game.goals,
      game.team_one_id,
      game.team_two_id,
    );

    const team_scored_id = CheckWichTeamScored(goal.player_id, game.goals);

    const calculeted_score = CheckIncrementeOrDecrementScore(
      team_scored_id,
      game.team_one_id.id,
      game.team_two_id.id,
      score_by_teams.game_score.team_one.goals,
      team_one.score,
      team_one.wins,
      team_one.draws,
      team_one.losses,
      score_by_teams.game_score.team_two.goals,
      team_two.score,
      team_two.wins,
      team_two.draws,
      team_two.losses,
    );

    if (calculeted_score) {
      await this.teamsService.update(calculeted_score.team_one.team_one_id, {
        score: calculeted_score.team_one.score,
        draws: calculeted_score.team_one.draws,
        wins: calculeted_score.team_one.wins,
        losses: calculeted_score.team_one.losses,
      });
      await this.teamsService.update(calculeted_score.team_two.team_two_id, {
        score: calculeted_score.team_two.score,
        draws: calculeted_score.team_two.draws,
        wins: calculeted_score.team_two.wins,
        losses: calculeted_score.team_two.losses,
      });
    }

    return savedGoal;
  }

  async remove(id: string): Promise<void> {
    await this.goalsRepository.softDelete(id);
  }
}
