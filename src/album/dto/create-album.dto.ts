import {
  IsNotEmpty,
  IsString,
  IsInt,
  ValidateIf,
  Min,
  IsUUID,
} from 'class-validator';
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

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  artistId: string | null;
}
