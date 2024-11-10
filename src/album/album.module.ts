import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumStorage } from 'src/storage/album.storage';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumStorage],
  exports: [AlbumStorage],
})
export class AlbumModule {}
