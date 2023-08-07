import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
//import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/entities/track.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}

  //private Albums: Album[] = this.db.albums;

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbumDto: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    // this.Albums.push(newAlbum);
    // return newAlbum;
    const newAlbum = this.albumRepository.create(newAlbumDto);
    return await this.albumRepository.save(newAlbum);
  }

  async findAll() {
    //return this.Albums;
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    //return this.Albums.find((artist) => artist.id === id);
    return await this.albumRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    // const album = this.Albums.find((album) => album.id === id);
    // if (album) {
    //   album.name = updateAlbumDto.name;
    //   album.year = updateAlbumDto.year;
    //   album.artistId = updateAlbumDto.artistId;
    // }
    // return album;
    const album = await this.albumRepository.findOneBy({ id });
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return await this.albumRepository.save(album);
  }

  async remove(id: string) {
    await this.albumRepository.delete(id);
    // const indexAlbum = this.Albums.findIndex((album) => album.id === id);
    // if (indexAlbum == -1) {
    //   throw new NotFoundException({
    //     message: `Album with id ${id} is not found`,
    //   });
    // }
    // this.Albums.splice(indexAlbum, 1);

    // this.db.tracks.map((item) => {
    //   const track = item as Track;
    //   if (track.albumId == id) {
    //     track.albumId = null;
    //   }
    // });

    // const index = this.db.favorites.albums.findIndex(
    //   (album) => album.id === id,
    // );
    // if (index != -1) {
    //   this.db.favorites.albums.splice(index, 1);
    // }
  }
}
