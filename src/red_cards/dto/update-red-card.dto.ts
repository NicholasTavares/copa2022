import { PartialType } from '@nestjs/mapped-types';
import { CreateRedCardDTO } from './create-red-card.dto';

export class UpdateRedCardDTO extends PartialType(CreateRedCardDTO) {}
