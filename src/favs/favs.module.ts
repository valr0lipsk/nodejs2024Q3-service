import { Module } from '@nestjs/common';
import { FavoritesController } from './favs.controller';
import { FavoritesService } from './favs.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoritesStorage } from 'src/storage/fav.storage';

@Module({
  imports: [AlbumModule, TrackModule, ArtistModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesStorage],
})
export class FavsModule {}
