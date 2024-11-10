import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './interfaces/dto';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const u = await this.trackService.findOne(id);

    if (u) {
      return res.status(200).json(u);
    }
    throw new NotFoundException(`Track with ID ${id} not found`);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    const r = await this.trackService.update(id, updateTrackDto);

    if (!r) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return res.json(r);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const r = await this.trackService.remove(id);

    if (!r) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return res.status(204).send();
  }
}
