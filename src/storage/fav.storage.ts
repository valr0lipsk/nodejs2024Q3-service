import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from 'src/favs/interfaces/fav.entity';
import { Artist } from 'src/artist/interfaces/artist.entity';
import { Album } from 'src/album/interfaces/album.entity';
import { Track } from 'src/track/interfaces/track.entity';

@Injectable()
export class FavoritesStorage {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getFavorites(): Promise<Favorites> {
    let favorites = await this.favoritesRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favorites) {
      favorites = this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favoritesRepository.save(favorites);
    }

    return favorites;
  }

  async addArtist(id: string): Promise<void> {
    let favorites = await this.getFavorites();
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (artist && !favorites.artists.some((a) => a.id === id)) {
      favorites.artists.push(artist);
      await this.favoritesRepository.save(favorites);
    }
  }

  async removeArtist(id: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    const artistIndex = favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (artistIndex === -1) return false;

    favorites.artists = favorites.artists.filter((artist) => artist.id !== id);
    await this.favoritesRepository.save(favorites);
    return true;
  }

  async addAlbum(id: string): Promise<void> {
    let favorites = await this.getFavorites();
    const album = await this.albumRepository.findOne({ where: { id } });

    if (album && !favorites.albums.some((a) => a.id === id)) {
      favorites.albums.push(album);
      await this.favoritesRepository.save(favorites);
    }
  }

  async removeAlbum(id: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    const albumIndex = favorites.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) return false;

    favorites.albums = favorites.albums.filter((album) => album.id !== id);
    await this.favoritesRepository.save(favorites);
    return true;
  }

  async addTrack(id: string): Promise<void> {
    let favorites = await this.getFavorites();
    const track = await this.trackRepository.findOne({ where: { id } });

    if (track && !favorites.tracks.some((t) => t.id === id)) {
      favorites.tracks.push(track);
      await this.favoritesRepository.save(favorites);
    }
  }

  async removeTrack(id: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    const trackIndex = favorites.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) return false;

    favorites.tracks = favorites.tracks.filter((track) => track.id !== id);
    await this.favoritesRepository.save(favorites);
    return true;
  }
}
