import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { Game } from '../games/entities/game.entity';
import { GamesService } from '../games/games.service';
import { Team } from '../teams/entities/team.entity';
import { TeamsService } from '../teams/teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, Game, Team])],
  controllers: [GoalsController],
  providers: [GoalsService, GamesService, TeamsService],
  exports: [GoalsService],
})
export class GoalsModule {}
