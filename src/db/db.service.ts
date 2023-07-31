import { Injectable } from '@nestjs/common';

const db = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

@Injectable()
export class DbService {
  get users() {
    return db.users;
  }

  get artists() {
    return db.artists;
  }

  get tracks() {
    return db.tracks;
  }

  get albums() {
    return db.albums;
  }

  get favorites() {
    return db.favorites;
  }
}
