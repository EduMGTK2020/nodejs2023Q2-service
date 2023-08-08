import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
  ],

  controllers: [AlbumController],
  providers: [AlbumService],

  exports: [AlbumService],
})
export class AlbumModule {}
