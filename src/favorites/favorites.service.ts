import {
  Injectable,
  UnprocessableEntityException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  private Favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  // create() {
  //   return 'This action adds a new favorite';
  // }

  findAll() {
    //return this.Favorites;
    return {
      artists: Array.from(this.Favorites.artists.values()),
      albums: Array.from(this.Favorites.albums.values()),
      tracks: Array.from(this.Favorites.tracks.values()),
    };
  }

  addTrackToFavorites(id: string) {
    console.log('addTrackToFavorites');
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException({
        message: `Track with id ${id} doesn't exist`,
      });
    }
    this.Favorites.tracks.push(track);
    return track;
  }

  removeTrackFromFavorites(id: string) {
    console.log('removeTrackFromFavorites');
    const indexTrack = this.Favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    if (indexTrack == -1) {
      throw new NotFoundException({
        message: `Track with id ${id} is not favorite`,
      });
    }
    this.Favorites.tracks.splice(indexTrack, 1);
  }

  addArtistToFavorites(id: string) {
    console.log('addArtistToFavorites');
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException({
        message: `Artist with id ${id} doesn't exist`,
      });
    }
    this.Favorites.artists.push(artist);
    return artist;
  }

  removeArtistFromFavorites(id: string) {
    console.log('removeArtistFromFavorites');
    const indexArtist = this.Favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (indexArtist == -1) {
      throw new NotFoundException({
        message: `Artist with id ${id} is not favorite`,
      });
    }
    this.Favorites.artists.splice(indexArtist, 1);

    console.log(this.Favorites);
  }

  addAlbumToFavorites(id: string) {
    console.log('addAlbumToFavorites');
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException({
        message: `Album with id ${id} doesn't exist`,
      });
    }
    this.Favorites.albums.push(album);
    return album;
  }

  removeAlbumFromFavorites(id: string) {
    console.log('removeAlbumFromFavorites');
    const indexAlbum = this.Favorites.albums.findIndex(
      (album) => album.id === id,
    );
    if (indexAlbum == -1) {
      throw new NotFoundException({
        message: `Album with id ${id} is not favorite`,
      });
    }
    this.Favorites.albums.splice(indexAlbum, 1);
  }
}
