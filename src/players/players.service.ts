import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playersRepository.find();
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playersRepository.findOne({
      where: { id },
      relations: ['team_id'],
    });

    if (!player) {
      throw new NotFoundException(`Player ID ${id} not found`);
    }

    return player;
  }

  async update(id: string, updatePlayerDTO: UpdatePlayerDTO) {
    const player = await this.playersRepository.preload({
      id,
      ...updatePlayerDTO,
    });

    if (!player) {
      throw new NotFoundException(`Player ID ${id} not found`);
    }

    return this.playersRepository.save(player);
  }

  create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const player = this.playersRepository.create({
      ...createPlayerDTO,
    });
    return this.playersRepository.save(player);
  }

  async remove(id: string): Promise<void> {
    await this.playersRepository.softDelete(id);
  }
}
