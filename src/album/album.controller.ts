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
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './interfaces/dto';
import { Response } from 'express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const u = await this.albumService.findOne(id);

    if (u) {
      return res.status(200).json(u);
    }
    throw new NotFoundException(`Album with ID ${id} not found`);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    const r = await this.albumService.update(id, updateAlbumDto);

    if (!r) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return res.json(r);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const r = await this.albumService.remove(id);
    if (!r) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return res.status(204).send();
  }
}
