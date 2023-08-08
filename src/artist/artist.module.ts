import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
// import { DbService } from 'src/db/db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist]),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],

  controllers: [ArtistController],
  providers: [ArtistService],

  exports: [ArtistService],
})
export class ArtistModule {}
