import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './interfaces/dto';
import { ArtistStorage } from 'src/storage/artist.storage';

@Injectable()
export class ArtistService {
  constructor(private readonly storage: ArtistStorage) {}
  create(createArtistDto: CreateArtistDto) {
    return this.storage.create(createArtistDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
