import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
// import { DbService } from 'src/db/db.service';

import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  //private Artists: Artist[] = this.db.artists;

  async create(createArtistDto: CreateArtistDto) {
    const newArtistDto: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    // this.Artists.push(newArtist);
    // return newArtist;
    const newArtist = this.artistRepository.create(newArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  async findAll() {
    //return this.Artists;
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    //return this.Artists.find((artist) => artist.id === id);
    return await this.artistRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    // const artist = this.Artists.find((artist) => artist.id === id);
    // if (artist) {
    //   artist.name = updateArtistDto.name;
    //   artist.grammy = updateArtistDto.grammy;
    // }
    // return artist;
    const artist = await this.artistRepository.findOneBy({ id });
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return await this.artistRepository.save(artist);
  }

  async remove(id: string) {
    await this.artistRepository.delete(id);
    // const indexArtist = this.Artists.findIndex((artist) => artist.id === id);
    // if (indexArtist == -1) {
    //   throw new NotFoundException({
    //     message: `Artist with id ${id} is not found`,
    //   });
    // }
    // this.Artists.splice(indexArtist, 1);

    // this.db.tracks.map((item) => {
    //   const track = item as Track;
    //   if (track.artistId == id) {
    //     track.artistId = null;
    //   }
    // });

    // this.db.albums.map((item) => {
    //   const album = item as Album;
    //   if (album.artistId == id) {
    //     album.artistId = null;
    //   }
    // });

    // const index = this.db.favorites.artists.findIndex(
    //   (artist) => artist.id === id,
    // );
    // if (index != -1) {
    //   this.db.favorites.artists.splice(index, 1);
    // }
  }
}
