import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
//import { DbService } from 'src/db/db.service';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  // private Tracks: Track[] = this.db.tracks;

  async create(createTrackDto: CreateTrackDto) {
    const newTrackDto: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    // this.Tracks.push(newTrack);
    // return newTrack;
    const newTrack = this.trackRepository.create(newTrackDto);
    return await this.trackRepository.save(newTrack);
  }

  async findAll() {
    //return this.Tracks;
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    //return this.Tracks.find((track) => track.id === id);
    return await this.trackRepository.findOneBy({ id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    // const track = this.Tracks.find((track) => track.id === id);
    // if (track) {
    //   track.name = updateTrackDto.name;
    //   track.albumId = updateTrackDto.albumId;
    //   track.artistId = updateTrackDto.artistId;
    //   track.duration = updateTrackDto.duration;
    // }
    // return track;
    const track = await this.trackRepository.findOneBy({ id });
    track.name = updateTrackDto.name;
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    track.duration = updateTrackDto.duration;
    return await this.trackRepository.save(track);
  }

  async remove(id: string) {
    await this.trackRepository.delete(id);
    // const indexTrack = this.Tracks.findIndex((track) => track.id === id);
    // if (indexTrack == -1) {
    //   throw new NotFoundException({
    //     message: `Track with id ${id} is not found`,
    //   });
    // }
    // this.Tracks.splice(indexTrack, 1);
    // const index = this.db.favorites.tracks.findIndex(
    //   (track) => track.id === id,
    // );
    // if (index != -1) {
    //   this.db.favorites.tracks.splice(index, 1);
    // }
  }
}
