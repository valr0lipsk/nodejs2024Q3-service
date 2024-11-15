import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from 'src/lib/classes/base-storage';
import { CreateTrackDto, UpdateTrackDto } from 'src/track/interfaces/dto';
import { Track } from 'src/track/interfaces/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackStorage extends Storage<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor(
    @InjectRepository(Track)
    repository: Repository<Track>,
  ) {
    super(repository);
  }
}
