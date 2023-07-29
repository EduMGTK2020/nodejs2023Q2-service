import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}

  private Artists: Artist[] = this.db.artists;

  create(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.Artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.Artists;
  }

  findOne(id: string) {
    return this.Artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.Artists.find((artist) => artist.id === id);
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
    }
    return artist;
  }

  remove(id: string) {
    const indexArtist = this.Artists.findIndex((artist) => artist.id === id);
    if (indexArtist == -1) {
      throw new NotFoundException({
        message: `Artist with id ${id} is not found`,
      });
    }
    this.Artists.splice(indexArtist, 1);

    this.db.tracks.map((item) => {
      const track = item as Track;
      if (track.artistId == id) {
        track.artistId = null;
      }
    });

    this.db.albums.map((item) => {
      const album = item as Album;
      if (album.artistId == id) {
        album.artistId = null;
      }
    });

    const index = this.db.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index != -1) {
      this.db.favorites.artists.splice(index, 1);
    }

    return;
  }
}
