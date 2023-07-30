import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsInt()
  @IsNotEmpty()
  duration: number; // integer number
}
