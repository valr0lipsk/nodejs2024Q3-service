import { Album } from 'src/album/interfaces/entity.interface';
import { Artist } from 'src/artist/interfaces/entity.interface';
import { Track } from 'src/track/interfaces/entity.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
