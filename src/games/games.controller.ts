import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGameDTO } from './dto/create-game.dto';
import { UpdateGameDTO } from './dto/update-game.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Post()
  create(@Body() createGameDTO: CreateGameDTO) {
    return this.gamesService.create(createGameDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDTO: UpdateGameDTO) {
    return this.gamesService.update(id, updateGameDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
