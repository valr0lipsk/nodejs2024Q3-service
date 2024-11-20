import { Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany('Artist')
  @JoinTable({
    name: 'favorites_artists',
    joinColumn: { name: 'favorite_id' },
    inverseJoinColumn: { name: 'artist_id' },
  })
  artists: any[];

  @ManyToMany('Album')
  @JoinTable({
    name: 'favorites_albums',
    joinColumn: { name: 'favorite_id' },
    inverseJoinColumn: { name: 'album_id' },
  })
  albums: any[];

  @ManyToMany('Track')
  @JoinTable({
    name: 'favorites_tracks',
    joinColumn: { name: 'favorite_id' },
    inverseJoinColumn: { name: 'track_id' },
  })
  tracks: any[];
}
