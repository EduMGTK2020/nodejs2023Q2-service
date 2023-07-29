import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

const Albums: Album[] = [];

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    Albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return Albums;
  }

  findOne(id: string) {
    return Albums.find((artist) => artist.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = Albums.find((album) => album.id === id);
    if (album) {
      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      album.artistId = updateAlbumDto.artistId;
    }
    return album;
  }

  remove(id: string) {
    const indexAlbum = Albums.findIndex((album) => album.id === id);
    if (indexAlbum == -1) {
      throw new NotFoundException({
        message: `Album with id ${id} is not found`,
      });
    }
    Albums.splice(indexAlbum, 1);
    return;
  }
}
