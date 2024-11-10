import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from 'src/artist/interfaces/dto';
import { Artist } from 'src/artist/interfaces/entity.interface';
import { Storage } from 'src/lib/classes/base-storage';

@Injectable()
export class ArtistStorage extends Storage<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor() {
    super();
    this.entities = [
      {
        id: '3b935613-581b-4466-9a88-143bc02497b8',
        name: 'Artist 1',
        grammy: false,
      },
      {
        id: '24139432-a1b9-429b-9fda-a97b99fbf26e',
        name: 'Artist 2',
        grammy: true,
      },
    ];
  }
}
