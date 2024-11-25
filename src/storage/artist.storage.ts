import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from 'src/artist/interfaces/dto';
import { Artist } from 'src/artist/interfaces/artist.entity';
import { Storage } from 'src/lib/classes/base-storage';
import { AlbumStorage } from './album.storage';
import { TrackStorage } from './track.storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistStorage extends Storage<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor(
    @InjectRepository(Artist)
    repository: Repository<Artist>,
    private readonly albumStorage: AlbumStorage,
    private readonly trackStorage: TrackStorage,
  ) {
    super(repository);
  }

  async delete(id: string): Promise<boolean> {
    const artist = await this.repository.findOne({ where: { id } });
    if (!artist) return false;

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

    await this.repository.remove(artist);
    return true;
  }
}
