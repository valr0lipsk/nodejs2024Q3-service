import { Track } from 'src/track/interfaces/track.entity';
import { Album } from 'src/album/interfaces/album.entity';
import { Artist } from 'src/artist/interfaces/artist.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
