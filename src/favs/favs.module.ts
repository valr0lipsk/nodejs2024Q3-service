import { Module } from '@nestjs/common';
import { FavoritesController } from './favs.controller';
import { FavoritesService } from './favs.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoritesStorage } from 'src/storage/fav.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './interfaces/fav.entity';
import { Artist } from 'src/artist/interfaces/artist.entity';
import { Album } from 'src/album/interfaces/album.entity';
import { Track } from 'src/track/interfaces/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorites, Artist, Album, Track]),
    AlbumModule,
    TrackModule,
    ArtistModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesStorage],
})
export class FavsModule {}
