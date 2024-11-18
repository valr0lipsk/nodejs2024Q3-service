import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne('Artist', { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist: any;

  @OneToMany('Track', 'album')
  tracks: any[];
}
