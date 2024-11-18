import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany('Album', 'artist')
  albums: any[];

  @OneToMany('Track', 'artist')
  tracks: any[];
}
