import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

const Tracks: Track[] = [];

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    Tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return Tracks;
  }

  findOne(id: string) {
    return Tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = Tracks.find((track) => track.id === id);
    if (track) {
      track.name = updateTrackDto.name;
      track.albumId = updateTrackDto.albumId;
      track.artistId = updateTrackDto.artistId;
      track.duration = updateTrackDto.duration;
    }
    return track;
  }

  remove(id: string) {
    const indexTrack = Tracks.findIndex((track) => track.id === id);
    if (indexTrack == -1) {
      throw new NotFoundException({
        message: `Track with id ${id} is not found`,
      });
    }
    Tracks.splice(indexTrack, 1);
    return;
  }
}
