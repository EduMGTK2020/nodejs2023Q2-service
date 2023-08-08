import {
  Injectable,
  Inject,
  forwardRef,
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

    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,

    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async createFavorites() {
    const favorites = this.favoriteRepository.create();
    return await this.favoriteRepository.save(favorites);
  }

  async getFavorites() {
    let favorites = await this.favoriteRepository.find({
      relations: { albums: true, artists: true, tracks: true },
    });

    if (!favorites.length) {
      const newFavorites = await this.createFavorites();
      favorites = await this.favoriteRepository.find({
        where: { id: newFavorites.id },
        relations: { albums: true, artists: true, tracks: true },
      });
    }
    return favorites[0];
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

    // this.Favorites.tracks.push(track);
    // return track;
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

    // const indexTrack = this.Favorites.tracks.findIndex(
    //   (track) => track.id === id,
    // );
    // if (indexTrack == -1) {
    //   throw new NotFoundException({
    //     message: `Track with id ${id} is not favorite`,
    //   });
    // }
    // this.Favorites.tracks.splice(indexTrack, 1);
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

    // const artist = this.artistService.findOne(id);
    // if (!artist) {
    //   throw new UnprocessableEntityException({
    //     message: `Artist with id ${id} doesn't exist`,
    //   });
    // }
    // this.Favorites.artists.push(artist);
    // return artist;
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

    // const indexArtist = this.Favorites.artists.findIndex(
    //   (artist) => artist.id === id,
    // );
    // if (indexArtist == -1) {
    //   throw new NotFoundException({
    //     message: `Artist with id ${id} is not favorite`,
    //   });
    // }
    // this.Favorites.artists.splice(indexArtist, 1);
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

    // const album = this.albumService.findOne(id);
    // if (!album) {
    //   throw new UnprocessableEntityException({
    //     message: `Album with id ${id} doesn't exist`,
    //   });
    // }
    // this.Favorites.albums.push(album);
    // return album;
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

    // const indexAlbum = this.Favorites.albums.findIndex(
    //   (album) => album.id === id,
    // );
    // if (indexAlbum == -1) {
    //   throw new NotFoundException({
    //     message: `Album with id ${id} is not favorite`,
    //   });
    // }
    // // this.Favorites.albums.splice(indexAlbum, 1);
  }
}
