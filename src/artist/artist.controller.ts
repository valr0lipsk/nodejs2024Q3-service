import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './interfaces/dto';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const u = await this.artistService.findOne(id);
    if (u) {
      return res.status(200).json(u);
    }
    throw new NotFoundException(`Artist with ID ${id} not found`);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    const r = await this.artistService.update(id, updateArtistDto);

    if (!r) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return res.json(r);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const r = await this.artistService.remove(id);

    if (!r) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return res.status(204).send();
  }
}
