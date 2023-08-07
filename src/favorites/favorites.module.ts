import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    TrackService,
    //AlbumService,
    //ArtistService,
    DbService,
  ],
})
export class FavoritesModule {}
