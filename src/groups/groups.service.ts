import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDTO } from './dto/create-group.dto';
import { UpdateGroupDTO } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.groupsRepository.find({
      relations: ['teams'],
      order: {
        name: 'ASC',
        teams: {
          score: 'DESC',
        },
      },
    });
  }

  async findOne(id: string): Promise<Group | null> {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ['teams'],
    });

    if (!group) {
      throw new NotFoundException(`Group ID ${id} not found`);
    }

    return group;
  }

  async update(id: string, updateGroupDTO: UpdateGroupDTO) {
    const group = await this.groupsRepository.preload({
      id,
      ...updateGroupDTO,
    });

    if (!group) {
      throw new NotFoundException(`Group ID ${id} not found`);
    }

    return this.groupsRepository.save(group);
  }

  async create(createGroupDTO: CreateGroupDTO): Promise<Group> {
    const group = this.groupsRepository.create({
      ...createGroupDTO,
    });
    try {
      await this.groupsRepository.save(group);
    } catch (error) {
      if (error.sqlState === '23000' && error.errno === 1062) {
        // duplicate name group
        throw new ConflictException('Name group already exists');
      }

      throw new InternalServerErrorException();
    }
    return group;
  }

  async remove(id: string): Promise<void> {
    await this.groupsRepository.softDelete(id);
  }
}
