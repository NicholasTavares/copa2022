import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateYellowCardDTO } from './dto/create-yellowcard.dto';
import { UpdateYellowCardDTO } from './dto/update-yello-card.dto';
import { Yellow_card } from './entities/yellow_card.entity.entity';

@Injectable()
export class YellowCardsService {
  constructor(
    @InjectRepository(Yellow_card)
    private yellowCardsRepository: Repository<Yellow_card>,
  ) {}

  findAll(): Promise<Yellow_card[]> {
    return this.yellowCardsRepository.find();
  }

  async findOne(id: string): Promise<Yellow_card> {
    const yellow_card = await this.yellowCardsRepository.findOne({
      where: { id },
      relations: ['player_id', 'game_id'],
    });

    if (!yellow_card) {
      throw new NotFoundException(`Yellow Card ID ${id} not found`);
    }

    return yellow_card;
  }

  async findByPlayer(id: string): Promise<Yellow_card[]> {
    const yellow_cards = await this.yellowCardsRepository.find({
      where: { player_id: id },
    });

    return yellow_cards;
  }

  async update(id: string, updateYellowCardDTO: UpdateYellowCardDTO) {
    const yellow_card = await this.yellowCardsRepository.preload({
      id,
      ...updateYellowCardDTO,
    });

    if (!yellow_card) {
      throw new NotFoundException(`Yellow card ID ${id} not found`);
    }

    return this.yellowCardsRepository.save(yellow_card);
  }

  async create(createYellowCardDTO: CreateYellowCardDTO): Promise<Yellow_card> {
    const yellow_card = this.yellowCardsRepository.create({
      ...createYellowCardDTO,
    });

    return this.yellowCardsRepository.save(yellow_card);
  }

  async remove(id: string): Promise<void> {
    await this.yellowCardsRepository.softDelete(id);
  }
}
