import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

const Artists: Artist[] = [];

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    Artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return Artists;
  }

  findOne(id: string) {
    return Artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = Artists.find((artist) => artist.id === id);
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
    }
    return artist;
  }

  remove(id: string) {
    const indexArtist = Artists.findIndex((artist) => artist.id === id);
    if (indexArtist == -1) {
      throw new NotFoundException({
        message: `Artist with id ${id} is not found`,
      });
    }
    Artists.splice(indexArtist, 1);
    return;
  }
}
