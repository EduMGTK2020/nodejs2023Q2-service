import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private Tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.Tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.Tracks;
  }

  findOne(id: string) {
    return this.Tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.Tracks.find((track) => track.id === id);
    if (track) {
      track.name = updateTrackDto.name;
      track.albumId = updateTrackDto.albumId;
      track.artistId = updateTrackDto.artistId;
      track.duration = updateTrackDto.duration;
    }
    return track;
  }

  remove(id: string) {
    const indexTrack = this.Tracks.findIndex((track) => track.id === id);
    if (indexTrack == -1) {
      throw new NotFoundException({
        message: `Track with id ${id} is not found`,
      });
    }
    this.Tracks.splice(indexTrack, 1);
    return;
  }
}
