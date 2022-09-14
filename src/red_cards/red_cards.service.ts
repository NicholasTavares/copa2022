import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRedCardDTO } from './dto/create-red-card.dto';
import { UpdateRedCardDTO } from './dto/update-red-card.dto';
import { Red_card } from './entities/red_card.entity';

@Injectable()
export class RedCardsService {
  constructor(
    @InjectRepository(Red_card)
    private redCardsRepository: Repository<Red_card>,
  ) {}

  findAll(): Promise<Red_card[]> {
    return this.redCardsRepository.find();
  }

  async findOne(id: string): Promise<Red_card> {
    const red_card = await this.redCardsRepository.findOne({
      where: { id },
      relations: ['player_id', 'game_id'],
    });

    if (!red_card) {
      throw new NotFoundException(`Red Card ID ${id} not found`);
    }

    return red_card;
  }

  async update(id: string, updateRedCardDTO: UpdateRedCardDTO) {
    const red_card = await this.redCardsRepository.preload({
      id,
      ...updateRedCardDTO,
    });

    if (!red_card) {
      throw new NotFoundException(`Red card ID ${id} not found`);
    }

    return this.redCardsRepository.save(red_card);
  }

  create(createRedCardDTO: CreateRedCardDTO): Promise<Red_card> {
    const red_card = this.redCardsRepository.create({
      ...createRedCardDTO,
    });
    return this.redCardsRepository.save(red_card);
  }

  async remove(id: string): Promise<void> {
    await this.redCardsRepository.softDelete(id);
  }
}
