import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  albumId: string;

  @ManyToOne('Artist', { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist: any;

  @ManyToOne('Album', { nullable: true })
  @JoinColumn({ name: 'albumId' })
  album: any;
}
