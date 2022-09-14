import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDTO } from './create-game.dto';

export class UpdateGameDTO extends PartialType(CreateGameDTO) {}
