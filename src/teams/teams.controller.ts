import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTeamDTO } from './dto/create-team.dto';
import { UpdateTeamDTO } from './dto/update-team.dto';
import { TeamsService } from './teams.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Response } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  create(
    @Body() createTeamDTO: CreateTeamDTO,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.teamsService.create({
      ...createTeamDTO,
      image: image.filename,
    });
  }

  @Get('/images/:imagename')
  findTeamImage(@Param('imagename') imagename: string, @Res() res: Response) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', storage))
  update(
    @Param('id') id: string,
    @Body() updateTeamDTO: UpdateTeamDTO,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.teamsService.update(id, {
      ...updateTeamDTO,
      image: image.filename,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
