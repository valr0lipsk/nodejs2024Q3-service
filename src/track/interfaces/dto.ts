import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty({ message: 'Duration is required' })
  duration: number;
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
