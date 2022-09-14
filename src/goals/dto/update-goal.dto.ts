import { PartialType } from '@nestjs/mapped-types';
import { CreateGoalDTO } from './create-goal.dto';

export class UpdateGoalDTO extends PartialType(CreateGoalDTO) {}
