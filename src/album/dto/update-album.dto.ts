import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
