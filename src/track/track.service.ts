import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  private Tracks: Track[] = this.db.tracks;

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

    const index = this.db.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    if (index != -1) {
      this.db.favorites.tracks.splice(index, 1);
    }
    return;
  }
}
