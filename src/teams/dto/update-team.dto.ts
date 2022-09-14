import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDTO } from './create-team.dto';

export class UpdateTeamDTO extends PartialType(CreateTeamDTO) {}
