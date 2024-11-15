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

    // Теперь favorites уже содержит полные объекты, а не только id
    return {
      artists: favorites.artists || [],
      albums: favorites.albums || [],
      tracks: favorites.tracks || [],
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
