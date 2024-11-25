import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumStorage } from 'src/storage/album.storage';
import { TrackModule } from 'src/track/track.module';
import { Album } from './interfaces/album.entity';

@Module({
  imports: [TrackModule, TypeOrmModule.forFeature([Album])],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumStorage],
  exports: [AlbumStorage],
})
export class AlbumModule {}
