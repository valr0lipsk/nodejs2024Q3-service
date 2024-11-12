import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Year is required' })
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
