import { IsNotEmpty, IsString, IsInt, ValidateIf, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  artistId: string | null; // refers to Artist

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  albumId: string | null; // refers to Album

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty()
  duration: number; // integer number
}
