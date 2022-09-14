import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { GroupsModule } from './groups/groups.module';
import { GamesModule } from './games/games.module';
import { GoalsModule } from './goals/goals.module';
import { RedCardsModule } from './red_cards/red_cards.module';
import { YellowCardsModule } from './yellow_cards/yellow_cards.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfiguration from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    TeamsModule,
    PlayersModule,
    GroupsModule,
    GamesModule,
    GoalsModule,
    RedCardsModule,
    YellowCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
