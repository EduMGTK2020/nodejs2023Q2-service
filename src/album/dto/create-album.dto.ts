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
  @ApiProperty()
  artistId: string | null;
}
