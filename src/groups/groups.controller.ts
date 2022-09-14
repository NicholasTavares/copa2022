import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGroupDTO } from './dto/create-group.dto';
import { UpdateGroupDTO } from './dto/update-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Post()
  create(@Body() createGroupDTO: CreateGroupDTO) {
    return this.groupsService.create(createGroupDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDTO: UpdateGroupDTO) {
    return this.groupsService.update(id, updateGroupDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
