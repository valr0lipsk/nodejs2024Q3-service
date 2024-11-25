import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStorage } from 'src/storage/artist.storage';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './interfaces/artist.entity';

@Module({
  imports: [TrackModule, AlbumModule, TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStorage],
  exports: [ArtistStorage],
})
export class ArtistModule {}
