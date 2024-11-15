import { Injectable } from '@nestjs/common';
import { Storage } from 'src/lib/classes/base-storage';
import { CreateTrackDto, UpdateTrackDto } from 'src/track/interfaces/dto';
import { Track } from 'src/track/interfaces/track.entity';

@Injectable()
export class TrackStorage extends Storage<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor() {
    super();
  }
}
