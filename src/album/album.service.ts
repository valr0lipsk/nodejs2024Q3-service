import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './interfaces/dto';
import { AlbumStorage } from 'src/storage/album.storage';

@Injectable()
export class AlbumService {
  constructor(private readonly storage: AlbumStorage) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create(createAlbumDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.update(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
