import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }
  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.removeArtistFromFavorites(id);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favoritesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFavoriteDto: UpdateFavoriteDto,
  // ) {
  //   return this.favoritesService.update(+id, updateFavoriteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.favoritesService.remove(+id);
  // }
}
