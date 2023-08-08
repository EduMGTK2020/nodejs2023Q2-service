import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from './entities/favorite.entity';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
//import { DbService } from 'src/db/db.service';

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

  //private Favorites: Favorite = this.dbService.favorites;

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

  addTrackToFavorites(id: string) {
    // const track = this.trackService.findOne(id);
    // if (!track) {
    //   throw new UnprocessableEntityException({
    //     message: `Track with id ${id} does not exist`,
    //   });
    // }
    // this.Favorites.tracks.push(track);
    // return track;
  }

  removeTrackFromFavorites(id: string) {
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

  addArtistToFavorites(id: string) {
    // const artist = this.artistService.findOne(id);
    // if (!artist) {
    //   throw new UnprocessableEntityException({
    //     message: `Artist with id ${id} doesn't exist`,
    //   });
    // }
    // this.Favorites.artists.push(artist);
    // return artist;
  }

  removeArtistFromFavorites(id: string) {
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

  addAlbumToFavorites(id: string) {
    // const album = this.albumService.findOne(id);
    // if (!album) {
    //   throw new UnprocessableEntityException({
    //     message: `Album with id ${id} doesn't exist`,
    //   });
    // }
    // this.Favorites.albums.push(album);
    // return album;
  }

  removeAlbumFromFavorites(id: string) {
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
