import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/album/interfaces/dto';
import { Album } from 'src/album/interfaces/entity.interface';
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
    this.entities = [
      {
        id: '3b935613-581b-4466-9a88-143bc02497b8',
        name: 'Album 1',
        year: 2024,
        artistId: '3b935613-581b-4466-9a88-143bc02497b8',
      },
      {
        id: '24139432-a1b9-429b-9fda-a97b99fbf26e',
        name: 'Album 2',
        year: 1998,
        artistId: '24139432-a1b9-429b-9fda-a97b99fbf26e',
      },
    ];
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
