import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/favs/interfaces/entity.interface';

@Injectable()
export class FavoritesStorage {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getFavorites(): Promise<Favorites> {
    return { ...this.favorites };
  }

  async addArtist(id: string): Promise<void> {
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }

  async removeArtist(id: string): Promise<boolean> {
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) return false;

    this.favorites.artists.splice(index, 1);
    return true;
  }

  async addAlbum(id: string): Promise<void> {
    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
  }

  async removeAlbum(id: string): Promise<boolean> {
    const index = this.favorites.albums.indexOf(id);
    if (index === -1) return false;

    this.favorites.albums.splice(index, 1);
    return true;
  }

  async addTrack(id: string): Promise<void> {
    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
  }

  async removeTrack(id: string): Promise<boolean> {
    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) return false;

    this.favorites.tracks.splice(index, 1);
    return true;
  }
}
