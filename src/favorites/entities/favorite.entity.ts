import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Favorite {
  @ApiProperty()
  artists: Artist[];

  @ApiProperty()
  albums: Album[];

  @ApiProperty()
  tracks: Track[];
}
