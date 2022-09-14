import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateYellowCardDTO } from './dto/create-yellowcard.dto';
import { UpdateYellowCardDTO } from './dto/update-yello-card.dto';
import { YellowCardsService } from './yellow_cards.service';

@Controller('Yellow-cards')
export class YellowCardsController {
  constructor(private readonly yellowCardsService: YellowCardsService) {}

  @Get()
  findAll() {
    return this.yellowCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yellowCardsService.findOne(id);
  }

  @Post()
  create(@Body() createYellowCardDTO: CreateYellowCardDTO) {
    return this.yellowCardsService.create(createYellowCardDTO);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateYellowCardDTO: UpdateYellowCardDTO,
  ) {
    return this.yellowCardsService.update(id, updateYellowCardDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yellowCardsService.remove(id);
  }
}
