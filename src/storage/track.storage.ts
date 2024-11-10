import { Injectable } from '@nestjs/common';
import { Storage } from 'src/lib/classes/base-storage';
import { CreateTrackDto, UpdateTrackDto } from 'src/track/interfaces/dto';
import { Track } from 'src/track/interfaces/entity.interface';

@Injectable()
export class TrackStorage extends Storage<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor() {
    super();
    this.entities = [
      {
        id: '3b935613-581b-4466-9a88-143bc02497b8',
        name: 'Track 1',
        artistId: '3b935613-581b-4466-9a88-143bc02497b8',
        albumId: '3b935613-581b-4466-9a88-143bc02497b8',
        duration: 120,
      },
      {
        id: '24139432-a1b9-429b-9fda-a97b99fbf26e',
        name: 'Track 2',
        artistId: '24139432-a1b9-429b-9fda-a97b99fbf26e',
        albumId: '24139432-a1b9-429b-9fda-a97b99fbf26e',
        duration: 180,
      },
    ];
  }
}
