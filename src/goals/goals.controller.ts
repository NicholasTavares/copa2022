import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGoalDTO } from './dto/create-goal.dto';
import { UpdateGoalDTO } from './dto/update-goal.dto';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  findAll() {
    return this.goalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne(id);
  }

  @Post()
  create(@Body() createPlayerDTO: CreateGoalDTO) {
    return this.goalsService.create(createPlayerDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDTO: UpdateGoalDTO) {
    return this.goalsService.update(id, updatePlayerDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalsService.remove(id);
  }
}
