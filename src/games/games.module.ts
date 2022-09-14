import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from '../teams/teams.service';
import { Team } from '../teams/entities/team.entity';
import { Game } from './entities/game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Team])],
  controllers: [GamesController],
  providers: [GamesService, TeamsService],
  exports: [GamesService],
})
export class GamesModule {}
