import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  //@IsOptional()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ description: 'refers to Artist' })
  artistId: string | null; // refers to Artist
}
