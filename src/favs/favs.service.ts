import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumStorage } from 'src/storage/album.storage';
import { ArtistStorage } from 'src/storage/artist.storage';
import { FavoritesStorage } from 'src/storage/fav.storage';
import { TrackStorage } from 'src/storage/track.storage';
import { FavoritesResponse } from './interfaces/entity.interface';
import { Artist } from 'src/artist/interfaces/entity.interface';
import { Album } from 'src/album/interfaces/entity.interface';
import { Track } from 'src/track/interfaces/entity.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesStorage: FavoritesStorage,
    private readonly artistStorage: ArtistStorage,
    private readonly albumStorage: AlbumStorage,
    private readonly trackStorage: TrackStorage,
  ) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesStorage.getFavorites();

    const artists = await Promise.all(
      favorites.artists.map((id) => this.artistStorage.findOne(id)),
    );
    const albums = await Promise.all(
      favorites.albums.map((id) => this.albumStorage.findOne(id)),
    );
    const tracks = await Promise.all(
      favorites.tracks.map((id) => this.trackStorage.findOne(id)),
    );

    return {
      artists: artists.filter((artist): artist is Artist => !!artist),
      albums: albums.filter((album): album is Album => !!album),
      tracks: tracks.filter((track): track is Track => !!track),
    };
  }

  async addArtist(id: string): Promise<void> {
    const artist = await this.artistStorage.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with ID ${id} doesn't exist`,
      );
    }
    await this.favoritesStorage.addArtist(id);
  }

  async removeArtist(id: string): Promise<void> {
    const removed = await this.favoritesStorage.removeArtist(id);
    if (!removed) {
      throw new NotFoundException(`Artist with ID ${id} is not in favorites`);
    }
  }

  async addAlbum(id: string): Promise<void> {
    const album = await this.albumStorage.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with ID ${id} doesn't exist`,
      );
    }
    await this.favoritesStorage.addAlbum(id);
  }

  async removeAlbum(id: string): Promise<void> {
    const removed = await this.favoritesStorage.removeAlbum(id);
    if (!removed) {
      throw new NotFoundException(`Album with ID ${id} is not in favorites`);
    }
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.trackStorage.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with ID ${id} doesn't exist`,
      );
    }
    await this.favoritesStorage.addTrack(id);
  }

  async removeTrack(id: string): Promise<void> {
    const removed = await this.favoritesStorage.removeTrack(id);
    if (!removed) {
      throw new NotFoundException(`Track with ID ${id} is not in favorites`);
    }
  }
}
