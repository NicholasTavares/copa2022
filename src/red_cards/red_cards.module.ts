import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Red_card } from './entities/red_card.entity';
import { RedCardsController } from './red_cards.controller';
import { RedCardsService } from './red_cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Red_card])],
  controllers: [RedCardsController],
  providers: [RedCardsService],
  exports: [RedCardsService],
})
export class RedCardsModule {}
