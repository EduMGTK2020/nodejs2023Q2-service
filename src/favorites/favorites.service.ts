import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,

    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  async getFavorites() {
    const favorites = await this.favoriteRepository.findOneBy({ id: null });
    if (favorites) {
      return await this.favoriteRepository.findOne({
        where: { id: favorites.id },
        relations: { albums: true, artists: true, tracks: true },
      });
    } else {
      const newFavorites = this.favoriteRepository.create();
      await this.favoriteRepository.save(newFavorites);
      return await this.favoriteRepository.findOne({
        where: { id: newFavorites.id },
        relations: { albums: true, artists: true, tracks: true },
      });
    }
  }

  async findAll() {
    const favorites = await this.getFavorites();
    return {
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
  }

  async addTrackToFavorites(id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException({
        message: `Track with id ${id} does not exist`,
      });
    }
    const favorites = await this.getFavorites();
    favorites.tracks.push(track);
    return await this.favoriteRepository.save(favorites);
  }

  async removeTrackFromFavorites(id: string) {
    const favorites = await this.getFavorites();
    const indexTrack = favorites.tracks.findIndex((track) => track.id === id);
    if (indexTrack == -1) {
      throw new NotFoundException({
        message: `Track with id ${id} is not favorite`,
      });
    }
    favorites.tracks.splice(indexTrack, 1);
    await this.favoriteRepository.save(favorites);
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException({
        message: `Artist with id ${id} doesn't exist`,
      });
    }
    const favorites = await this.getFavorites();
    favorites.artists.push(artist);
    return await this.favoriteRepository.save(favorites);
  }

  async removeArtistFromFavorites(id: string) {
    const favorites = await this.getFavorites();
    const indexArtist = favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (indexArtist == -1) {
      throw new NotFoundException({
        message: `Artist with id ${id} is not favorite`,
      });
    }
    favorites.artists.splice(indexArtist, 1);
    await this.favoriteRepository.save(favorites);
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException({
        message: `Album with id ${id} doesn't exist`,
      });
    }
    const favorites = await this.getFavorites();
    favorites.albums.push(album);
    return await this.favoriteRepository.save(favorites);
  }

  async removeAlbumFromFavorites(id: string) {
    const favorites = await this.getFavorites();
    const indexAlbum = favorites.albums.findIndex((album) => album.id === id);
    if (indexAlbum == -1) {
      throw new NotFoundException({
        message: `Album with id ${id} is not favorite`,
      });
    }
    favorites.albums.splice(indexAlbum, 1);
    await this.favoriteRepository.save(favorites);
  }
}
