import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from 'src/artist/interfaces/dto';
import { Artist } from 'src/artist/interfaces/entity.interface';
import { Storage } from 'src/lib/classes/base-storage';
import { AlbumStorage } from './album.storage';
import { TrackStorage } from './track.storage';

@Injectable()
export class ArtistStorage extends Storage<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor(
    private readonly albumStorage: AlbumStorage,
    private readonly trackStorage: TrackStorage,
  ) {
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

  async delete(id: string): Promise<boolean> {
    const index = this.entities.findIndex((entity) => entity.id === id);
    if (index === -1) return false;

    const albums = await this.albumStorage.findAll();
    const tracks = await this.trackStorage.findAll();

    for (const album of albums) {
      if (album.artistId === id) {
        await this.albumStorage.update(album.id, { ...album, artistId: null });
      }
    }

    for (const track of tracks) {
      if (track.artistId === id) {
        await this.trackStorage.update(track.id, { ...track, artistId: null });
      }
    }

    this.entities.splice(index, 1);
    return true;
  }
}
