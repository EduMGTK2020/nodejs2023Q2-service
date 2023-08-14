import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
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

  async addTrackToFavorites(track: Track) {
    const favorites = await this.getFavorites();
    favorites.tracks.push(track);
    return await this.favoriteRepository.save(favorites);
  }

  async removeTrackFromFavorites(indexTrack: number) {
    const favorites = await this.getFavorites();
    favorites.tracks.splice(indexTrack, 1);
    await this.favoriteRepository.save(favorites);
  }

  async indexTrackInFavorities(id: string) {
    const favorites = await this.getFavorites();
    return favorites.tracks.findIndex((track) => track.id === id);
  }

  async addArtistToFavorites(artist: Artist) {
    const favorites = await this.getFavorites();
    favorites.artists.push(artist);
    return await this.favoriteRepository.save(favorites);
  }

  async removeArtistFromFavorites(indexArtist: number) {
    const favorites = await this.getFavorites();
    favorites.artists.splice(indexArtist, 1);
    await this.favoriteRepository.save(favorites);
  }

  async indexArtistInFavorities(id: string) {
    const favorites = await this.getFavorites();
    return favorites.artists.findIndex((artist) => artist.id === id);
  }

  async addAlbumToFavorites(album: Album) {
    const favorites = await this.getFavorites();
    favorites.albums.push(album);
    return await this.favoriteRepository.save(favorites);
  }

  async removeAlbumFromFavorites(indexAlbum: number) {
    const favorites = await this.getFavorites();
    favorites.albums.splice(indexAlbum, 1);
    await this.favoriteRepository.save(favorites);
  }

  async indexAlbumInFavorities(id: string) {
    const favorites = await this.getFavorites();
    return favorites.albums.findIndex((album) => album.id === id);
  }
}
