import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Delete,
  ParseUUIDPipe,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@ApiBearerAuth()
@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'get all favorites',
  })
  @ApiOkResponse({
    description: 'Favorites successfully getted',
    type: Favorite,
  })
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'add track to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of track',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'Track successfully added',
  })
  @ApiBadRequestResponse({
    description: 'Track id is invalid (not UUID).',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track with given id does not exist',
  })
  async addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException({
        message: `Track with id ${id} does not exist`,
      });
    }
    return await this.favoritesService.addTrackToFavorites(track);
  }

  @Delete('track/:id')
  @ApiOperation({
    summary: 'delete track from favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of track',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Track successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Track id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({
    description: 'Track with given id does not found',
  })
  @HttpCode(204)
  async removeTrackFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const indexTrackInFavorities =
      await this.favoritesService.indexTrackInFavorities(id);
    if (indexTrackInFavorities == -1) {
      throw new NotFoundException({
        message: `Track with id ${id} is not favorite`,
      });
    }
    return await this.favoritesService.removeTrackFromFavorites(
      indexTrackInFavorities,
    );
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'add album to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of album',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'Album successfully added',
  })
  @ApiBadRequestResponse({
    description: 'Album id is invalid (not UUID).',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album with given id does not exist',
  })
  async addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException({
        message: `Album with id ${id} does not exist`,
      });
    }
    return await this.favoritesService.addAlbumToFavorites(album);
  }

  @Delete('album/:id')
  @ApiOperation({
    summary: 'delete album from favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of album',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Album successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Album id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({
    description: 'Album with given id does not found',
  })
  @HttpCode(204)
  async removeAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const indexAlbumInFavorities =
      await this.favoritesService.indexAlbumInFavorities(id);
    if (indexAlbumInFavorities == -1) {
      throw new NotFoundException({
        message: `Album with id ${id} is not favorite`,
      });
    }
    return await this.favoritesService.removeAlbumFromFavorites(
      indexAlbumInFavorities,
    );
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'add artist to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of artist',
    type: 'string',
  })
  @ApiCreatedResponse({
    description: 'Artist successfully added',
  })
  @ApiBadRequestResponse({
    description: 'Artist id is invalid (not UUID).',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist with given id does not exist',
  })
  async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException({
        message: `Artist with id ${id} does not exist`,
      });
    }
    return await this.favoritesService.addArtistToFavorites(artist);
  }

  @Delete('artist/:id')
  @ApiOperation({
    summary: 'delete artist from favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of artist',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Artist successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Artist id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({
    description: 'Artist with given id does not found',
  })
  @HttpCode(204)
  async removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const indexArtistInFavorities =
      await this.favoritesService.indexArtistInFavorities(id);
    if (indexArtistInFavorities == -1) {
      throw new NotFoundException({
        message: `Artist with id ${id} is not favorite`,
      });
    }
    return await this.favoritesService.removeArtistFromFavorites(
      indexArtistInFavorities,
    );
  }
}
