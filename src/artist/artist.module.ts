import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStorage } from 'src/storage/artist.storage';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStorage],
})
export class ArtistModule {}
