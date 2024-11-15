import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/album/interfaces/dto';
import { Album } from 'src/album/interfaces/album.entity';
import { Storage } from 'src/lib/classes/base-storage';
import { TrackStorage } from './track.storage';

@Injectable()
export class AlbumStorage extends Storage<
  Album,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor(private readonly trackStorage: TrackStorage) {
    super();
  }

  async delete(id: string): Promise<boolean> {
    const index = this.entities.findIndex((entity) => entity.id === id);
    if (index === -1) return false;

    const tracks = await this.trackStorage.findAll();
    for (const track of tracks) {
      if (track.albumId === id) {
        await this.trackStorage.update(track.id, { ...track, albumId: null });
      }
    }

    this.entities.splice(index, 1);
    return true;
  }
}
