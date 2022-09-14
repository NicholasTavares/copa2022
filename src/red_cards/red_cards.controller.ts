import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRedCardDTO } from './dto/create-red-card.dto';
import { UpdateRedCardDTO } from './dto/update-red-card.dto';
import { RedCardsService } from './red_cards.service';

@Controller('red-cards')
export class RedCardsController {
  constructor(private readonly redCardsService: RedCardsService) {}

  @Get()
  findAll() {
    return this.redCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redCardsService.findOne(id);
  }

  @Post()
  create(@Body() createRedCardDTO: CreateRedCardDTO) {
    return this.redCardsService.create(createRedCardDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRedCardDTO: UpdateRedCardDTO) {
    return this.redCardsService.update(id, updateRedCardDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redCardsService.remove(id);
  }
}
