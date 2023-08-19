import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/db/data-source';

import { LoggerService } from './logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
