import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackStorage } from 'src/storage/track.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './interfaces/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TrackController],
  providers: [TrackService, TrackStorage],
  exports: [TrackStorage],
})
export class TrackModule {}
