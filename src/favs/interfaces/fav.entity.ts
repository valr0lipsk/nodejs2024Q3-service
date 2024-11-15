import { Album } from 'src/album/interfaces/album.entity';
import { Artist } from 'src/artist/interfaces/artist.entity';
import { Track } from 'src/track/interfaces/track.entity';
import { Entity, ManyToMany, JoinTable } from 'typeorm';

@Entity('favorites')
export class Favorites {
  @ManyToMany(() => Artist)
  @JoinTable({
    name: 'favorites_artists',
    joinColumn: { name: 'favorite_id' },
    inverseJoinColumn: { name: 'artist_id' },
  })
  artists: Artist[];

  @ManyToMany(() => Album)
  @JoinTable({
    name: 'favorites_albums',
    joinColumn: { name: 'favorite_id' },
    inverseJoinColumn: { name: 'album_id' },
  })
  albums: Album[];

  @ManyToMany(() => Track)
  @JoinTable({
    name: 'favorites_tracks',
    joinColumn: { name: 'favorite_id' },
    inverseJoinColumn: { name: 'track_id' },
  })
  tracks: Track[];
}
