import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Yellow_card } from './entities/yellow_card.entity.entity';
import { YellowCardsController } from './yellow_cards.controller';
import { YellowCardsService } from './yellow_cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Yellow_card])],
  controllers: [YellowCardsController],
  providers: [YellowCardsService],
  exports: [YellowCardsService],
})
export class YellowCardsModule {}
