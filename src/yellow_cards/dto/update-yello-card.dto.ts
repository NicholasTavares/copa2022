import { PartialType } from '@nestjs/mapped-types';
import { CreateYellowCardDTO } from './create-yellowcard.dto';

export class UpdateYellowCardDTO extends PartialType(CreateYellowCardDTO) {}
