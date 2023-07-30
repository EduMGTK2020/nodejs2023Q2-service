import { IsNotEmpty, IsString, IsInt, ValidateIf, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  artistId: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  albumId: string | null;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty()
  duration: number;
}
