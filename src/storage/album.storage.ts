import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/album/interfaces/dto';
import { Album } from 'src/album/interfaces/album.entity';
import { Storage } from 'src/lib/classes/base-storage';
import { TrackStorage } from './track.storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumStorage extends Storage<
  Album,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor(
    @InjectRepository(Album)
    repository: Repository<Album>,
    private readonly trackStorage: TrackStorage,
  ) {
    super(repository);
  }

  async delete(id: string): Promise<boolean> {
    const album = await this.repository.findOne({ where: { id } });
    if (!album) return false;

    const tracks = await this.trackStorage.findAll();

    for (const track of tracks) {
      if (track.albumId === id) {
        await this.trackStorage.update(track.id, { ...track, albumId: null });
      }
    }

    await this.repository.remove(album);
    return true;
  }
}
