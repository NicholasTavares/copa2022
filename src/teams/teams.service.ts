import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDTO } from './dto/create-team.dto';
import { UpdateTeamDTO } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { ITeam } from './models/ITeam';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  findAll(): Promise<Team[]> {
    return this.teamsRepository.find();
  }

  async findOne(id: string): Promise<ITeam> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: [
        'players',
        'group_id',
        'games_as_team_one',
        'games_as_team_two',
      ],
    });

    if (!team) {
      throw new NotFoundException(`Team ID ${id} not found`);
    }

    return {
      ...(team as unknown as ITeam),
    };
  }

  async update(id: string, updateTeamDto: UpdateTeamDTO) {
    const team = await this.teamsRepository.preload({
      id,
      ...updateTeamDto,
    });

    if (!team) {
      throw new NotFoundException(`Team ID ${id} not found`);
    }

    return this.teamsRepository.save(team);
  }

  async incrementDraws(id: string) {
    const team = await this.teamsRepository.findOne({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException(`Team ID ${id} not found`);
    }

    team.draws += 1;
    team.score += 1;

    return this.teamsRepository.save(team);
  }

  async create(createTeamDTO: CreateTeamDTO): Promise<Team> {
    const team = this.teamsRepository.create(createTeamDTO);

    try {
      await this.teamsRepository.save(team);
    } catch (error) {
      if (error.sqlState === '23000' && error.errno === 1062) {
        // duplicate name group
        throw new ConflictException('Name country already exists');
      }

      throw new InternalServerErrorException();
    }

    return team;
  }

  async remove(id: string): Promise<void> {
    const team = await this.teamsRepository.findOneOrFail({
      where: { id },
      relations: ['players'],
    });
    await this.teamsRepository.softRemove(team);
  }
}
