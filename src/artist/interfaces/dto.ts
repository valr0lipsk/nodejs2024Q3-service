import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Grammy must be true or false' })
  grammy: boolean;
}

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
