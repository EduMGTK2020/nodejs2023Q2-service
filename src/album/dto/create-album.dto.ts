import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ description: 'refers to Artist' })
  artistId: string | null; // refers to Artist
}
