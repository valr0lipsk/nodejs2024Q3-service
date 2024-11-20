import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './interfaces/dto';
import { TrackStorage } from 'src/storage/track.storage';

@Injectable()
export class TrackService {
  constructor(private readonly storage: TrackStorage) {}
  create(createTrackDto: CreateTrackDto) {
    return this.storage.create(createTrackDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
