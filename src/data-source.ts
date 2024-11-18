import { DataSource } from 'typeorm';
import { User } from './user/interfaces/user.entity';
import { Artist } from './artist/interfaces/artist.entity';
import { Album } from './album/interfaces/album.entity';
import { Track } from './track/interfaces/track.entity';
import { Favorites } from './favs/interfaces/fav.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME,
  entities: [User, Artist, Album, Track, Favorites],
  migrations: ['src/migrations/*.ts'],
  schema: 'public', // добавьте это
  synchronize: false,
  migrationsRun: true,
});
