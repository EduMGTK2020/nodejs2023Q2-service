import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private Artists: Artist[] = [];

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
    const indexUser = this.Artists.findIndex((artist) => artist.id === id);
    if (indexUser == -1) {
      throw new NotFoundException({
        message: `User with id ${id} is not found`,
      });
    }
    this.Artists.splice(indexUser, 1);
    return;
  }
}
