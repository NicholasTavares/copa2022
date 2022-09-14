import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Post()
  create(@Body() createPlayerDTO: CreatePlayerDTO) {
    return this.playersService.create(createPlayerDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDTO: UpdatePlayerDTO) {
    return this.playersService.update(id, updatePlayerDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
