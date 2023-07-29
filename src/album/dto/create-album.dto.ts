import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
