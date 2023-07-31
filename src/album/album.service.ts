import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}

  private Albums: Album[] = this.db.albums;

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.Albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.Albums;
  }

  findOne(id: string) {
    return this.Albums.find((artist) => artist.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.Albums.find((album) => album.id === id);
    if (album) {
      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      album.artistId = updateAlbumDto.artistId;
    }
    return album;
  }

  remove(id: string) {
    const indexAlbum = this.Albums.findIndex((album) => album.id === id);
    if (indexAlbum == -1) {
      throw new NotFoundException({
        message: `Album with id ${id} is not found`,
      });
    }
    this.Albums.splice(indexAlbum, 1);

    this.db.tracks.map((item) => {
      const track = item as Track;
      if (track.albumId == id) {
        track.albumId = null;
      }
    });

    const index = this.db.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    if (index != -1) {
      this.db.favorites.albums.splice(index, 1);
    }
  }
}
