import { IsNotEmpty, IsString, IsInt, ValidateIf, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ description: 'refers to Artist' })
  artistId: string | null; // refers to Artist
}
