import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Delete,
  ParseUUIDPipe,
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
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

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
  addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addTrackToFavorites(id);
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
  removeTrackFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeTrackFromFavorites(id);
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
  addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addAlbumToFavorites(id);
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
  removeAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeAlbumFromFavorites(id);
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
  addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addArtistToFavorites(id);
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
  removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
